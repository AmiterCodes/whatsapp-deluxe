import { View } from '@react-fullstack/fullstack';
import { Chat } from '../shared/chat';
export interface ChatListViewProps {
    chats: Chat[];
    setActiveChat: (chatId: string) => void;
}
declare type ChatListView = View<ChatListViewProps>;
export default ChatListView;
