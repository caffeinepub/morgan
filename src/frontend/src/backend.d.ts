import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export interface ChatMessage {
    id: bigint;
    userEmail: string;
    adminReply?: string;
    userId: UserId;
    repliedAt?: bigint;
    message: string;
    timestamp: bigint;
}
export interface UserProfile {
    id: UserId;
    displayName: string;
    email: string;
    registeredAt: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimFirstAdmin(): Promise<void>;
    getAllChatMessages(): Promise<Array<ChatMessage>>;
    getAllUsers(): Promise<Array<UserProfile>>;
    getCallerUserProfile(): Promise<UserProfile>;
    getCallerUserRole(): Promise<UserRole>;
    getChatMessagesForCaller(): Promise<Array<ChatMessage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    promoteToAdmin(user: Principal): Promise<void>;
    register(email: string, displayName: string): Promise<void>;
    replyToMessage(messageId: bigint, replyText: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendSupportMessage(message: string): Promise<void>;
}
