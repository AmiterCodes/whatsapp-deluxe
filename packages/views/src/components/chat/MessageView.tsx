import React from 'react';
import { ListItem, ListItemAvatar, Avatar } from '@material-ui/core';
import { Message } from '@whatsapp-deluxe/shared/src/shared/message';

const MessageView = (props: { message: Message; }) => {
    


    return <ListItem>
        <ListItemAvatar>
            <Avatar  />
        </ListItemAvatar>
    </ListItem>
}

export default MessageView;