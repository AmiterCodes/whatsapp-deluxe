export enum MessageAck {
    ACK_ERROR = -1,
    ACK_PENDING = 0,
    ACK_SERVER = 1,
    ACK_DEVICE = 2,
    ACK_READ = 3,
    ACK_PLAYED = 4,
}

export enum MessageTypes {
    TEXT = 'chat',
    AUDIO = 'audio',
    VOICE = 'ptt',
    IMAGE = 'image',
    VIDEO = 'video',
    DOCUMENT = 'document',
    STICKER = 'sticker',
    LOCATION = 'location',
    CONTACT_CARD = 'vcard',
    CONTACT_CARD_MULTI = 'multi_vcard',
    REVOKED = 'revoked',
    UNKNOWN = 'unknown',
}

export interface Message {
	        /** ACK status for the message */
            ack: MessageAck,
            /** If the message was sent to a group, this field will contain the user that sent the message. */
            author?: string,
            /** Message content */
            body: string,
            /** Indicates if the message was a broadcast */
            broadcast: boolean,
            /** Indicates if the message was a status update */
            isStatus: boolean,
            /** ID for the Chat that this message was sent to, except if the message was sent by the current user */
            from: string,
            /** Indicates if the message was sent by the current user */
            fromMe: boolean,
            /** Indicates if the message has media available for download */
            hasMedia: boolean,
            /** Indicates if the message was sent as a reply to another message */
            hasQuotedMsg: boolean,
            /** ID that represents the message */
            id: string,
            /** Indicates if the message was forwarded */
            isForwarded: boolean,
            /** Location information contained in the message, if the message is type "location" */
            location: Location,
            /** List of vCards contained in the message */
            vCards: string[],
            /** MediaKey that represents the sticker 'ID' */
            mediaKey?: string,
            /** Indicates the mentions in the message body. */
            mentionedIds: [],
            /** Unix timestamp for when the message was created */
            timestamp: number,
            /**
             * ID for who this message is for.
             * If the message is sent by the current user, it will be the Chat to which the message is being sent.
             * If the message is sent by another user, it will be the ID for the current user.
             */
            to: string,
            /** Message type */
            type: MessageTypes,

            messageMedia?: MessageMedia
}

export interface MessageToSend {
    content: string;
    chatId: string;
}

export interface MessageMedia {
    mimetype: string;
    data: string;
    filename: string | undefined | null
}

export interface MessagePreview {
	date: Date;
	stringifiedBody: string;
	author: string;
    messageAck: MessageAck;
    fromMe: boolean;
}

export interface Location {
    description?: string | null,
    latitude: string,
    longitude: string,
}