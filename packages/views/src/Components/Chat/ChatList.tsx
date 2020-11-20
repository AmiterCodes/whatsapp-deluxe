import React from "react";
import { Component } from '@react-fullstack/fullstack'
import { ViewsInterface } from '@whatsapp-deluxe/shared'
import ChatButton from "./ChatButton"

class ChatList extends Component<ViewsInterface["ChatListView"]> {
	render() {
		return this.props.chats.map((chat) => <ChatButton chat={chat} />)
	}
}

export default ChatList;