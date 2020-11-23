import React from "react";
import { Component } from '@react-fullstack/fullstack';
import { ViewsInterface } from '@whatsapp-deluxe/shared';
import ChatButton from "./ChatButton";
import { List, ListRowRenderer } from "react-virtualized";
import useWindowDimensions from "hooks/windowDimensions";




class ChatList extends Component<ViewsInterface["ChatListView"]> {

	render() {

		const rowRenderer : ListRowRenderer = ({ index,key,style })=> {
			const chat = this.props.chats[index]; 
			return <div key={chat.id} style={style}><ChatButton onClick={() => this.props.setActiveChat(chat.id)}  chat={chat} /></div>;
		}

		return <List 
		height={window.innerHeight}
		style={{ padding: 0, margin: 0, outline: 'none' }}
		rowHeight={100} 
		rowCount={this.props.chats.length} 
		rowRenderer={rowRenderer}
		width={window.innerWidth / 3.33}
		 />
	}
}

export default ChatList;