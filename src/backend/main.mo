import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserId = Principal;

  public type UserProfile = {
    id : UserId;
    email : Text;
    displayName : Text;
    registeredAt : Int;
  };

  module UserProfile {
    public func compare(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      switch (Text.compare(profile1.email, profile2.email)) {
        case (#equal) { Text.compare(profile1.displayName, profile2.displayName) };
        case (order) { order };
      };
    };
  };

  type ChatMessage = {
    id : Nat;
    userId : UserId;
    userEmail : Text;
    message : Text;
    timestamp : Int;
    adminReply : ?Text;
    repliedAt : ?Int;
  };

  module ChatMessage {
    public func compare(msg1 : ChatMessage, msg2 : ChatMessage) : Order.Order {
      Int.compare(msg1.timestamp, msg2.timestamp);
    };

    public func compareById(msg1 : ChatMessage, msg2 : ChatMessage) : Order.Order {
      Nat.compare(msg1.id, msg2.id);
    };
  };

  let userProfiles = Map.empty<UserId, UserProfile>();
  let chatMessages = Map.empty<Nat, ChatMessage>();
  var nextMessageId = 1;
  var firstAdminClaimed = false;

  public shared ({ caller }) func register(email : Text, displayName : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous users cannot register");
    };

    switch (userProfiles.get(caller)) {
      case (?_) { Runtime.trap("User is already registered") };
      case (null) {
        if (email.size() == 0 or displayName.isEmpty()) {
          Runtime.trap("Email and display name must be provided");
        };

        let userProfile : UserProfile = {
          id = caller;
          email;
          displayName;
          registeredAt = Time.now();
        };

        userProfiles.add(caller, userProfile);

        // Register user in access control (non-admin)
        AccessControl.initialize(
          accessControlState,
          caller,
          "no-admin-token",
          "no-user-supplied-token"
        );
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User is not registered") };
      case (?userProfile) { userProfile };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    if (profile.id != caller) {
      Runtime.trap("Cannot save profile for another user");
    };

    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public query ({ caller }) func getAllUsers() : async [UserProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all users");
    };
    userProfiles.values().toArray().sort();
  };

  // Send a support message -- any authenticated (non-anonymous) user can send
  public shared ({ caller }) func sendSupportMessage(message : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("You must be logged in to send messages");
    };
    let userEmail = switch (userProfiles.get(caller)) {
      case (?p) { p.email };
      case (null) { caller.toText() };
    };
    let chatMsg : ChatMessage = {
      id = nextMessageId;
      userId = caller;
      userEmail;
      message;
      timestamp = Time.now();
      adminReply = null;
      repliedAt = null;
    };
    chatMessages.add(nextMessageId, chatMsg);
    nextMessageId += 1;
  };

  // Get messages for the caller -- any authenticated user
  public query ({ caller }) func getChatMessagesForCaller() : async [ChatMessage] {
    if (caller.isAnonymous()) {
      Runtime.trap("You must be logged in to view messages");
    };
    let messages = chatMessages.values().filter(
      func(msg) { msg.userId == caller }
    ).toArray().sort();
    messages;
  };

  public query ({ caller }) func getAllChatMessages() : async [ChatMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all chat messages");
    };
    chatMessages.values().toArray().sort(ChatMessage.compareById);
  };

  public shared ({ caller }) func replyToMessage(messageId : Nat, replyText : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reply to chat messages");
    };
    switch (chatMessages.get(messageId)) {
      case (null) { Runtime.trap("Message does not exist") };
      case (?msg) {
        let replyTimestamp = Time.now();
        let reply = {
          id = messageId;
          userId = msg.userId;
          userEmail = msg.userEmail;
          message = msg.message;
          timestamp = msg.timestamp;
          repliedAt = ?replyTimestamp;
          adminReply = ?replyText;
        };
        chatMessages.add(messageId, reply);
      };
    };
  };

  public shared ({ caller }) func promoteToAdmin(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can promote users to admin");
    };
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  // Allows any logged-in user to claim admin if no admin has been assigned yet.
  // Directly writes the admin role into state to avoid the permission catch-22.
  public shared ({ caller }) func claimFirstAdmin() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("You must be logged in to claim admin");
    };
    if (firstAdminClaimed) {
      Runtime.trap("An admin already exists");
    };

    // Directly assign admin role -- bypass permission check since no admin exists yet
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    firstAdminClaimed := true;
  };
};
