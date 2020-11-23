import { Message } from "@whatsapp-deluxe/shared/lib/shared/message";
import API from '../api';
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { ViewsProvider } from "@react-fullstack/fullstack";
import { ViewsInterface } from "@whatsapp-deluxe/shared";
import { Participant } from "@whatsapp-deluxe/shared/src/shared/contact";

interface ChatViewProps {
    chatId: string;
}


interface ChatViewState { 
    messages: Message[];
    participants: Participant[];
    name: string;
 }

class Chat extends Component<ChatViewProps, ChatViewState> {
    state : ChatViewState = {
        messages: [],
        name: 'No Chat Selected',
        participants: [],
    }

    listenerCleanups: Function[] = []

    componentDidMount() {
        this.updateChatData(this.props);
    }

    shouldComponentUpdate(nextProps: ChatViewProps) {
        if(this.props.chatId !== nextProps.chatId) {
            this.updateChatData(nextProps)
        }
        
        return true;
    }

    updateChatData(props: ChatViewProps) {

        this.listenerCleanups.forEach(f => f());

        const { chatId } = props;

        API.chats.loadParticipants(chatId).then((participants) => {
            this.setState({ participants });
        })

        API.messages.loadMessages(chatId, 50).then((messages) => {
            this.setState({ messages: [ ...messages ] });
        })

        const messageFetching = API.messages.emitter.on('messagesUpdated', messagesData => {
            if(chatId == messagesData.chatId) this.setState({ messages: [...this.state.messages, ...messagesData.messages] });
        })
        const participantFetching = API.chats.emitter.on('participantUpdate', participantsData => {
            if(chatId == participantsData.chatId) this.setState({ participants: participantsData.participants });
        })

        this.listenerCleanups.push(messageFetching.remove, participantFetching.remove);
    }

    render() {

        console.log("n word shmuel")

        const { chatId } = this.props;
        const { participants, messages, name } = this.state; 
            

        if(chatId == '') {
            return (<ViewsProvider<ViewsInterface>>
                {({ ChatView }) => <ChatView participants={[]} messages={[]} name={'No Chat Selected!'} /> }
            </ViewsProvider>);
        }
    

    
        return (<ViewsProvider<ViewsInterface>>
            {({ ChatView }) => <ChatView participants={participants} messages={messages} name={name} /> }
        </ViewsProvider>)
    }
}



export default Chat;