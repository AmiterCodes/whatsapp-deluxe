export const enum MessageAck {
    ACK_ERROR,
    ACK_PENDING,
    ACK_SERVER,
    ACK_DEVICE,
    ACK_READ,
    ACK_PLAYED,
};

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