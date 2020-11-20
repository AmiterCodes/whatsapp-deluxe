import { Chat as WhatsAppChat, Message, MessageTypes } from "whatsapp-web.js";
import { Chat as ViewChat } from '@whatsapp-deluxe/shared/src/shared/chat'
import { WhatsAppDeluxeAPIService } from "../service";
import { sleep } from "../../utils/time"
import { MessagePreview } from "@whatsapp-deluxe/shared/src/shared/message";


class Chats extends WhatsAppDeluxeAPIService {
	private syncChatsTime = 1500;
	chats: Array<WhatsAppChat> = [];

	private async updateChats() {
		try {
		this.chats = await this.client.getChats();
		} catch(e) {
			console.log(e);
		}
	}
	async serviceDidIntialized() {
		await this.updateChats();
		while(this.isIntialized) {
			await sleep(this.syncChatsTime);
			await this.updateChats();
		}
	}
	async getUserChats() {
		const chats = await Promise.all(this.chats.filter((chat) => !chat.isGroup).map( (chat) =>  this.mapChat(chat)));
		return chats;
	}
	async getGroupChats() {
		const chats = await Promise.all(this.chats.filter((chat) => chat.isGroup).map(( chat) =>  this.mapChat(chat)));
		return chats;
	}

	private async mapChat (chat: WhatsAppChat): Promise<ViewChat> {
		let messages = await chat.fetchMessages({ limit: 1 })
		let lastMessage: MessagePreview | undefined;
		

		if(messages.length !== 0) {
			const msg = messages[0];
			const author = msg.author || "";
			const stringifiedBody = await this.messagePreview(msg);
			

			lastMessage = { author, date: new Date(msg.timestamp), stringifiedBody }
		}

		
		return {
			archived: chat.archived,
			id: chat.id._serialized,
			isGroup: chat.isGroup,
			isMuted: chat.isMuted,
			name: chat.name,
			lastMessage,
			timestamp: chat.timestamp,
			unreadCount: chat.unreadCount 
		}
	}

	private async messagePreview(msg: Message) {
		let stringifiedBody = '';
		switch (msg.type) {
			case MessageTypes.LOCATION:
				stringifiedBody = '🗺 Location';
			case MessageTypes.IMAGE:
				stringifiedBody = '📷 Photo';
			case MessageTypes.TEXT:
				stringifiedBody = msg.body;
			case MessageTypes.VIDEO:
				stringifiedBody = '📹 Video';
			case MessageTypes.STICKER:
				stringifiedBody = '💩 Sticker';
			case MessageTypes.UNKNOWN:
				stringifiedBody = 'Unknown message type';
			case MessageTypes.VOICE:
				stringifiedBody = '🎤 Voice Recording';
			case MessageTypes.REVOKED:
				stringifiedBody = '🚫 Deleted message';
			case MessageTypes.DOCUMENT:
				stringifiedBody = '📃 ' + (await msg.downloadMedia()).filename;
			case MessageTypes.AUDIO:
				stringifiedBody = '⏺ Audio Recording';
			case MessageTypes.CONTACT_CARD:
				let contact = await msg.getContact();
				stringifiedBody = `👤 ${contact.name || contact.pushname}: ${contact.number}`;
			case MessageTypes.CONTACT_CARD_MULTI:
				stringifiedBody = `👥 Contact List`;
		}
		return stringifiedBody;
	}
}

export default Chats;