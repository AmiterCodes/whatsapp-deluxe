
export interface Message {
	date: Date;


}

enum MessageAck {
    ACK_ERROR,
    ACK_PENDING,
    ACK_SERVER,
    ACK_DEVICE,
    ACK_READ,
    ACK_PLAYED,
};

export interface MessagePreview {
	date: Date;
	stringifiedBody: string;
	author: string;
	messageAck: MessageAck;
}