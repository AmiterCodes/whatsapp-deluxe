import { View } from '@react-fullstack/fullstack'
import { Message } from "../shared/message";
import { Contact } from "../shared/contact";

interface ChatViewProps {
    messages: Array<Message>;
    name: string;
    participants: Contact[];
}

type ChatView = View<ChatViewProps>;
export default ChatView;