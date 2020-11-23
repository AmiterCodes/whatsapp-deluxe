import { View } from '@react-fullstack/fullstack';
import { Message, MessageToSend } from "../shared/message";
import { Participant } from "../shared/contact";
export interface ChatViewProps {
    messages: Array<Message>;
    name: string;
    participants: Participant[];
    sendMessage: (message: MessageToSend) => void;
}
declare type ChatView = View<ChatViewProps>;
export default ChatView;
