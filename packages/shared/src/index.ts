import { View } from "@react-fullstack/fullstack";
import ChatListView from './components/ChatListView'
import ChatView from './components/ChatView'
import ConnectionScreen from './components/ConnectionScreen'


export const Views = {
    ChatListView: {} as ChatListView,
    ChatView: {} as ChatView,
    WhatsAppProvider: {} as View<{ }>,
    ConnectionScreen: {} as ConnectionScreen,
}

export type ViewsInterface = typeof Views;