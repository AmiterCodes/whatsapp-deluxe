import React, { useState, useEffect } from 'react';
import { ViewsProvider } from '@react-fullstack/fullstack'
import { ViewsInterface } from '@whatsapp-deluxe/shared';
import { Chat } from '@whatsapp-deluxe/shared/src/shared/chat';
import API from '../api'

interface ChatListProps {
    setChatId: (chatId: string) => void;
}

const ChatList = ({ setChatId }: ChatListProps) => {
    const [userChats, setUserChats] = useState<Chat[]>([]);
    const [groupChats, setGroupChats] = useState<Chat[]>([]);
    useEffect(() => {
        API.chats.getUserChats().then((chats) => {
            setUserChats(chats);
        })
        API.chats.getGroupChats().then((chats) => {
            setGroupChats(chats);
        })
        const groupChatFetching = API.chats.emitter.on("newGroupViewChats", (newGroupChats) => {
            setGroupChats(newGroupChats);
        })
        const userChatFetching = API.chats.emitter.on("newUserViewChats", (newUserChats) => {
            setUserChats(newUserChats);
        })
        return () => {
            groupChatFetching.remove();
            userChatFetching.remove();
        }
    }, [])
    return (<ViewsProvider<ViewsInterface>>
        {({ ChatListView }) => <ChatListView
            setActiveChat={setChatId}
            chats={userChats}
    />}
    </ViewsProvider>)
}

export default ChatList;