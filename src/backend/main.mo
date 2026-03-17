import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

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

  public shared ({ caller }) func register(email : Text, displayName : Text) : async () {
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
        
        // Assign user role in the access control system
        AccessControl.assignRole(accessControlState, caller, caller, #user);
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
    
    // Verify the profile ID matches the caller
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

  public shared ({ caller }) func sendSupportMessage(message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send support messages");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User is not registered") };
      case (?userProfile) {
        let chatMsg : ChatMessage = {
          id = nextMessageId;
          userId = caller;
          userEmail = userProfile.email;
          message;
          timestamp = Time.now();
          adminReply = null;
          repliedAt = null;
        };
        chatMessages.add(nextMessageId, chatMsg);
        nextMessageId += 1;
      };
    };
  };

  public query ({ caller }) func getChatMessagesForCaller() : async [ChatMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access chat messages");
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
    switch (userProfiles.get(user)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?_) {
        AccessControl.assignRole(accessControlState, caller, user, #admin);
      };
    };
  };

  // Allows a registered user to claim admin if no admins exist yet
  public shared ({ caller }) func claimFirstAdmin() : async () {
    if (accessControlState.adminAssigned) {
      Runtime.trap("An admin already exists");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("You must be registered to claim admin") };
      case (?_) {
        AccessControl.assignRole(accessControlState, caller, caller, #admin);
      };
    };
  };
};
