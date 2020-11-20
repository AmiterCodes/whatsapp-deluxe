import React, { Component } from "react";
import { ViewsInterface } from "@whatsapp-deluxe/shared";
import { List } from "@material-ui/core";
import MessageView from "./MessageView";

export default class ChatView extends Component<ViewsInterface["ChatView"]> {
    render() {
        let { messages, name, participants } = this.props.props;

        return <List>
            {messages.map(message => <MessageView message={message} />)}
        </List>
    }
}