import { Message } from "@whatsapp-deluxe/shared/lib/shared/message";
import API from '../api';
import React from 'react';
import { useState, useEffect } from "react";
import { ViewsProvider } from "@react-fullstack/fullstack";
import { ViewsInterface } from "@whatsapp-deluxe/shared";
import { Participant } from "@whatsapp-deluxe/shared/src/shared/contact";

interface ChatViewProps {
    chatId: string;
}

const Chat = ({ chatId } : ChatViewProps) => {

    if(chatId == '') {
        return (<ViewsProvider<ViewsInterface>>
            {({ ChatView }) => <ChatView participants={[]} messages={[]} name={'No Chat Selected!'} /> }
        </ViewsProvider>);
    }

    const [messages, setMessages] = useState<Message[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([])
    const [name, setName] = useState<string>('Chat');
    useEffect(() => {

        API.chats.loadParticipants(chatId).then((paritcipantList) => {
            setParticipants(paritcipantList);
        })

        API.messages.loadMessages(chatId, 50).then((messageList) => {
            setMessages(messageList);
        })

        const messageFetching = API.messages.emitter.on('messagesUpdated', newMessages => {
            setMessages(newMessages);
        })
        const participantFetching = API.chats.emitter.on('participantUpdate', newParticipants => {
            if(chatId == newParticipants.chatId) setParticipants(newParticipants.participants);
        })
        return () => {
            messageFetching.remove();
            participantFetching.remove();    
        }
    }, [])


    return (<ViewsProvider<ViewsInterface>>
        {({ ChatView }) => <ChatView participants={participants} messages={messages} name={name} /> }
    </ViewsProvider>)





}

export default Chat;