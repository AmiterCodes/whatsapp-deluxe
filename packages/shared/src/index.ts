import { View } from "@react-fullstack/fullstack";
import { Message, Chat } from 'whatsapp-web.js';
import ChatList from './components/ChatList'


export const Views = {
    ChatList: {} as ChatList,
    ChatView: {} as View<{ name: string; loadMessages: () => Promise<Array<Message>> }>
}
