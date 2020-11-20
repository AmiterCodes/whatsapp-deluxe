import React, { Component } from 'react';

import { Views } from '@whatsapp-deluxe/shared'
import { Chat } from '@whatsapp-deluxe/shared/src/shared/chat'
import { ButtonBase, Card, Typography, makeStyles, CardContent, CardMedia } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: '.6rem'
    },
    title: {
        fontSize: '1.2rem',
        
    },
    lastMessage: {
        fontSize: '.8rem',
        color: 'rgba(0,0,0,0.7)'
    },
    media: {
        height: 50,
        width: 50,
        borderRadius: 1000
    }
});


const ChatButton = (props: {chat: Chat}) => {
    const classes = useStyles();

    const { chat } = props; 

    let { lastMessage } = chat;
    /** TODO: implement this component */
    return <div>
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={chat.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png'}>
            </CardMedia>
            <CardContent className={classes.content}>
                
                <Typography className={classes.title} variant="h3">
                    {chat.name}
                </Typography>
                <Typography className={classes.lastMessage} variant="body1">
                    {lastMessage && `${lastMessage.author}: ${lastMessage.stringifiedBody}`}
                </Typography>
            </CardContent>
        </Card>
    </div>
}

export default ChatButton;