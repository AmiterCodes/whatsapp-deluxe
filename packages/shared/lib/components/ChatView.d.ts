import { View } from '@react-fullstack/fullstack';
import { Message } from "../shared/message";
import { Participant } from "../shared/contact";
export interface ChatViewProps {
    messages: Array<Message>;
    name: string;
    participants: Participant[];
}
declare type ChatView = View<ChatViewProps>;
export default ChatView;
