import { WhatsAppDeluxeAPIService } from "../service";


import { Message as ViewMessage, MessageMedia } from "@whatsapp-deluxe/shared/lib/shared/message";
import { Events, Message, Message as WhatsAppMessage } from "whatsapp-web.js";


interface MessageEvents {
    messagesUpdated: { messages: ViewMessage[], chatId: string; };
}

export default class Messages extends WhatsAppDeluxeAPIService<MessageEvents> {


    private async mapMessage(message: WhatsAppMessage) : Promise<ViewMessage> {

        let messageMedia;
        if(message.hasMedia) {
            let waMessageMedia = await message.downloadMedia();
            messageMedia = {
                mimetype: waMessageMedia.mimetype,
                data: waMessageMedia.data,
                filename: waMessageMedia.filename 
            }
        }

        return {
            ack: message.ack,
            author: message.author,
            body: message.body,
            broadcast: message.broadcast,
            from: message.from,
            fromMe: message.fromMe,
            hasMedia: message.hasMedia,
            hasQuotedMsg: message.hasQuotedMsg,
            id: message.id._serialized,
            isForwarded: message.isForwarded,
            isStatus: message.isStatus,
            location: message.location,
            mediaKey: message.mediaKey,
            mentionedIds: message.mentionedIds,
            timestamp: message.timestamp,
            to: message.to,
            type: message.type,
            vCards: message.vCards,
            messageMedia
        }   
    }

    async serviceDidInitialized() {
        this.startLoadingMessages();
    }

    async startLoadingMessages() {

        const messageUpdateEventHandler = async (message: WhatsAppMessage) => {
            const chat = await message.getChat();
            
            this.emitter.call('messagesUpdated', {
                chatId: chat.id._serialized,
                messages: [await this.mapMessage(message)]
            })
        }

        this.client.on(Events.MESSAGE_CREATE, messageUpdateEventHandler)
    }

    async loadMessages(chatId: string, amount: number) {
		const chat = await this.client.getChatById(chatId);
        let messages = await chat.fetchMessages({limit: amount })
        return Promise.all(messages.map(message => this.mapMessage(message)));

	}
}