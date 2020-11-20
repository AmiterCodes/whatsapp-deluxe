import React, { Component } from 'react';

import { Views } from '@whatsapp-deluxe/shared'
import { Chat } from '@whatsapp-deluxe/shared/src/shared/chat'
import { ButtonBase, Card, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

});


const ChatButton = (props: {chat: Chat}) => {
    const classes = useStyles();

    const { chat } = props; 

    let { lastMessage } = chat;
    /** TODO: implement this component */
    return <div>
        <Card>
            <Typography>
                {chat.name}
            </Typography>
            <Typography>
                {lastMessage && `${lastMessage.author}: ${lastMessage.stringifiedBody}`}
            </Typography>
        </Card>
    </div>
}

export default ChatButton;