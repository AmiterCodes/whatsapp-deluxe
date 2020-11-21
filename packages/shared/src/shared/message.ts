export enum MessageAck {
    ACK_ERROR = -1,
    ACK_PENDING = 0,
    ACK_SERVER = 1,
    ACK_DEVICE = 2,
    ACK_READ = 3,
    ACK_PLAYED = 4,
}

export interface Message {
	date: Date;
    data: string;
    contactImageUrl: string;
}

export interface MessagePreview {
	date: Date;
	stringifiedBody: string;
	author: string;
    messageAck: MessageAck;
    fromMe: boolean;
}

