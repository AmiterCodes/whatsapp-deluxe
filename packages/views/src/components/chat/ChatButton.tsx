import React from 'react';

import { DateTime, Duration } from 'luxon';
import { Chat } from '@whatsapp-deluxe/shared/lib/shared/chat'
import { ButtonBase, Card, Typography, makeStyles, CardContent, CardMedia, Badge, Chip, CardActionArea } from '@material-ui/core';
import { MessageAck } from '@whatsapp-deluxe/shared/lib/shared/message';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneIcon from '@material-ui/icons/Done';
import MicIcon from '@material-ui/icons/Mic';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles({
    content: {
        width: '80%',
        overflow: 'hidden'
    },
    root: {
        width: '100%',
        height: '100%'
    },
    action: {
        display: 'flex',
        padding: '.6rem',
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: '1.2rem',

    },
    lastMessage: {
        fontSize: '.8rem',
        height: '50%',
        width: '100%',
        color: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'start',
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
    },
    ack: {
        margin: '0 .4rem'
    },
    messageBody: {
        alignSelf: 'center'
    }
});

const AckDisplay = (props: { ack: MessageAck }) => {

    const readColor = '#66a1ff';
    const unreadOpacity = '0.7'

    switch(props.ack) {
        case MessageAck.ACK_PENDING:
            return <HourglassEmptyIcon opacity={unreadOpacity} />
        case MessageAck.ACK_ERROR:
            return <ErrorOutlineIcon opacity={unreadOpacity} />
        case MessageAck.ACK_READ:
            return <DoneAllIcon htmlColor={readColor} />
        case MessageAck.ACK_DEVICE:
            return <DoneAllIcon opacity={unreadOpacity} />
        case MessageAck.ACK_SERVER:
            return <DoneIcon opacity={unreadOpacity}/>
        case MessageAck.ACK_PLAYED:
            return <MicIcon htmlColor={readColor} />
    }
}

const timestampString = (time : number) => {
    const dateTime = DateTime.fromMillis(time * 1000).toLocal();
    const local = DateTime.local();

    if(local.startOf('day').equals(dateTime.startOf('day'))) return dateTime.toFormat('t');
    else return dateTime.toFormat('DD');
}

const ChatButton = (props: { chat: Chat, onClick: Function }) => {
    const classes = useStyles();

    const { chat } = props;

    let { lastMessage } = chat;
    return <Card className={classes.root}>
            <CardActionArea className={classes.action} onClick={() => props.onClick()} >
                <Badge badgeContent={chat.unreadCount} invisible={chat.unreadCount === 0} color="secondary" max={1000} overlap="circle">
                    <CardMedia className={classes.media} image={chat.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png'}>
                    </CardMedia>
                </Badge>
                <CardContent className={classes.content}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography className={classes.title} variant="h3"> 
                            {chat.name}

                        </Typography>
                    {timestampString(chat.timestamp)}
                        
                    </div>
                    <Typography className={classes.lastMessage} variant="body1">
                        {lastMessage && <>
                        {lastMessage.fromMe && <span className={classes.ack}><AckDisplay ack={lastMessage.messageAck} /></span>}
                        <span className={classes.messageBody}>{`${lastMessage.author ? lastMessage.author + ":" : ""} ${lastMessage.stringifiedBody.substr(0,120)} ${lastMessage.stringifiedBody.length > 120 ? "..." : ""}`}</span>
                        </> }
                    </Typography>
                    <div>
                        {chat.pinned && <Chip icon={<RoomIcon />} />}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
}

export default ChatButton;