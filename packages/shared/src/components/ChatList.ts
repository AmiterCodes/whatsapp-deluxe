import { View } from '@react-fullstack/fullstack'
import { MessagePreview } from "../shared/message";

interface ChatListProps {
	chats: {
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
		/** */
		lastMessage: MessagePreview;
	}
}



type ChatList = View<ChatListProps>;
export default ChatList;