import React, { Component } from 'react';

import { DateTime } from 'luxon';
import { Chat } from '@whatsapp-deluxe/shared/src/shared/chat'
import { ButtonBase, Card, Typography, makeStyles, CardContent, CardMedia, Badge } from '@material-ui/core';
import { MessageAck } from '@whatsapp-deluxe/shared/src/shared/message';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles({
    content: {
        width: '80%',
        overflow: 'hidden'
    },
    root: {
        display: 'flex',
        padding: '.6rem',
        width: '100%'
    },
    title: {
        fontSize: '1.2rem',

    },
    lastMessage: {
        fontSize: '.8rem',
        width: '100%',
        color: 'rgba(0,0,0,0.7)',
        '&:before': {
            content: '',
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'linear-gradient(transparent 150px, white)'
        }
    },
    media: {
        height: 50,
        width: 50,
        borderRadius: 1000
    }
});

const AckDisplay = (props: { ack: MessageAck }) => {
    switch(props.ack) {
        case MessageAck.ACK_PENDING:
            return <HourglassEmptyIcon />
        case MessageAck.ACK_ERROR:
            return <ErrorOutlineIcon/>
    }
}


const ChatButton = (props: { chat: Chat }) => {
    const classes = useStyles();

    const { chat } = props;

    let { lastMessage } = chat;
    return <Card className={classes.root}>
            <Badge badgeContent={chat.unreadCount} invisible={chat.unreadCount == 0} color="secondary" max={1000} overlap="circle">
                <CardMedia className={classes.media} image={chat.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png'}>
                </CardMedia>
            </Badge>
            <CardContent className={classes.content}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography className={classes.title} variant="h3">
                        {chat.name}

                    </Typography>
                {DateTime.fromMillis(chat.timestamp*1000).toLocal().toFormat('ff')}
                    
                </div>
                <Typography className={classes.lastMessage} variant="body1">
                    {lastMessage && `${lastMessage.author ? lastMessage.author + ":" : ""} ${lastMessage.stringifiedBody}`}
                </Typography>
            </CardContent>
        </Card>
}

export default ChatButton;