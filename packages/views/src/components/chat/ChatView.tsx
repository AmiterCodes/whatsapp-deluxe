import React from "react";
import { ViewsInterface } from "@whatsapp-deluxe/shared";
import { List } from "@material-ui/core";
import MessageView from "./MessageView";
import { Component } from "@react-fullstack/fullstack";
import { Typography } from '@material-ui/core'

class ChatView extends Component<ViewsInterface["ChatView"]> {
    render() {
        let { messages, name, participants } = this.props;

        return <div>
            <Typography>
                { name }
            </Typography>
            <List style={{ width:'70vw' }}>
                {messages.map(message => <MessageView message={message} />)}
            </List>
        </div>
    }
}

export default ChatView;