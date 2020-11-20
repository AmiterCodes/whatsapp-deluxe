import { MessagePreview } from "./message";

export interface Chat {
    /** Indicates if the Chat is archived */
    archived: boolean;
    /** ID that represents the chat */
    id: string;
    /** Indicates if the Chat is a Group Chat */
    isGroup: boolean;
    /** Indicates if the Chat is muted */
    isMuted: boolean;
    /** Title of the chat */
    name: string;
    /** Unix timestamp for when the last activity occurred */
    timestamp: number;
    /** Amount of messages unread */
    unreadCount: number;
    /** Last Message that was sent on the chat */
    lastMessage: MessagePreview | undefined;


}


