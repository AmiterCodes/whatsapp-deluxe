import { View } from '@react-fullstack/fullstack'
import { MessagePreview } from "../shared/message";



interface ChatListViewProps {
    chats: Chat[];
    setActiveChat: (chatId: string) => void;
}



type ChatListView = View<ChatListViewProps>;
export default ChatListView;