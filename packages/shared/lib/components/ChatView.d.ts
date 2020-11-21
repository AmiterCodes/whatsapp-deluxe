import { View } from '@react-fullstack/fullstack';
import { Message } from "../shared/message";
import { Contact } from "../shared/contact";
export interface ChatViewProps {
    messages: Array<Message>;
    name: string;
    participants: Contact[];
}
declare type ChatView = View<ChatViewProps>;
export default ChatView;
