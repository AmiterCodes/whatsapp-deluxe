import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Card, CardContent, Theme, makeStyles } from '@material-ui/core';
import { Message } from '@whatsapp-deluxe/shared/lib/shared/message';

const useStyles = makeStyles({
    root: {
        margin: '.1rem',
        display: 'inline-block',
        minWidth: '1rem',
        
        
    },
    content: {
        padding: '1rem',
        '&:last-child': {
            paddingBottom: '1rem'
        }
    }

})


const MessageView = (props: { message: Message; }) => {
    
    const { message } = props;
    const { fromMe } = message;
    const classes = useStyles();

    return <Card className={classes.root} style={{ alignSelf: fromMe ? 'flex-end' : 'flex-start', backgroundColor: fromMe ? '#a8f6ff' : '#fff' }}>
        <CardContent className={classes.content}>
            {message.author && <Typography>
                {message.author}
            </Typography>}
            
            <Typography>
                {message.body}
            </Typography>
        </CardContent>
    </Card>
}

export default MessageView;