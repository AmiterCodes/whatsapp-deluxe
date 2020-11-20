import { Chat as WhatsAppChat, Message, MessageTypes, Events } from "whatsapp-web.js";
import { Chat as ViewChat } from '@whatsapp-deluxe/shared/src/shared/chat'
import { WhatsAppDeluxeAPIService } from "../service";
import { sleep } from "../../utils/time"
import { MessagePreview } from "@whatsapp-deluxe/shared/src/shared/message";
import API from "../";



interface ChatsEvents {
	newUserViewChats: ViewChat[];
	newGroupViewChats: ViewChat[];
}

class Chats extends WhatsAppDeluxeAPIService<ChatsEvents> {
	chats: Array<WhatsAppChat> = [];
	userChats: ViewChat[] = [];
	groupChats: ViewChat[] = [];

	private async autoUpdateChats() {
		try {
		this.chats = await this.client.getChats();
		console.log('Loaded all chats!')
		this.userChats = await this.getUserChats();
		console.log('loaded User Chats')
		this.groupChats = await this.getGroupChats();
		console.log('loaded Group Chats')
		this.emitter.call("newUserViewChats", this.userChats);
		this.emitter.call("newGroupViewChats", this.groupChats);
		this.client.on(Events.MESSAGE_CREATE,async (msg) => {
			const chat = await msg.getChat();
			const chatView = await this.mapChat(chat);
			const foundChat = this.chats.find((currentChat) => currentChat.id._serialized === chat.id._serialized)
			if (foundChat) {
				if (chatView.isGroup) {
					const foundViewChatIndex = this.groupChats.findIndex(currentChat => currentChat.id === chatView.id)
					const foundViewChat = this.groupChats[foundViewChatIndex];
					
					if(!foundViewChat.pinned) {
						this.groupChats.splice(foundViewChatIndex, 1);
						this.groupChats = [...this.groupChats.filter(chat => chat.pinned),
							 foundViewChat ,
							 ...this.groupChats.filter(chat => !chat.pinned)];
					}

					if (foundViewChat) {
						foundViewChat.lastMessage = chatView.lastMessage;
					}
					this.emitter.call("newGroupViewChats", this.groupChats);
				} else {
					const foundViewChatIndex = this.userChats.findIndex(currentChat => currentChat.id === chatView.id)
					const foundViewChat = this.userChats[foundViewChatIndex];

					if(!foundViewChat.pinned) {
						this.userChats.splice(foundViewChatIndex, 1);
						this.userChats = [...this.userChats.filter(chat => chat.pinned),
							 foundViewChat ,
							 ...this.userChats.filter(chat => !chat.pinned)];
					}

					if (foundViewChat) {
						foundViewChat.lastMessage = chatView.lastMessage;
					}
					
					this.emitter.call("newUserViewChats", this.userChats);
				}
			} else {
				this.chats.push(chat);
				if (chat.isGroup) {
					this.groupChats.push(await this.mapChat(chat));
					this.emitter.call("newGroupViewChats", this.groupChats);
				} else {
					this.userChats.push(await this.mapChat(chat));
					this.emitter.call("newUserViewChats", this.userChats);
				}
			}
		})
		} catch(e) {
			console.log(e);
		}
	}
	async serviceDidInitialized() {
		this.autoUpdateChats();
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
		//let imageUrl = await this.client.getProfilePicUrl(chat.id._serialized);

		if(messages.length !== 0) {
			const msg = messages[0];
			let { author } = msg;
			if(author) author = API.contacts.getNameByUserId(author);
			else author = '';
			const stringifiedBody = await this.messagePreview(msg);
			

			lastMessage = { author, date: new Date(msg.timestamp), stringifiedBody, messageAck: msg.ack, fromMe: msg.fromMe }
		}

		
		return {
			archived: chat.archived,
			id: chat.id._serialized,
			isGroup: chat.isGroup,
			isMuted: chat.isMuted,
			name: chat.name,
			lastMessage,
			timestamp: chat.timestamp,
			unreadCount: chat.unreadCount,
			imageUrl: undefined,
			//@ts-ignore
			pinned: chat.pinned

		}
	}

	private async messagePreview(msg: Message) {
		let stringifiedBody = '';
		switch (msg.type) {
			case MessageTypes.LOCATION:
				stringifiedBody = '🗺 Location';
				break;
			case MessageTypes.IMAGE:
				stringifiedBody = '📷 Photo';
				break;
			case MessageTypes.TEXT:
				stringifiedBody = msg.body;
				break;
			case MessageTypes.VIDEO:
				stringifiedBody = '📹 Video';
				break;
			case MessageTypes.STICKER:
				stringifiedBody = '💩 Sticker';
				break;
			case MessageTypes.UNKNOWN:
				stringifiedBody = 'Unknown message type';
				break;
			case MessageTypes.VOICE:
				stringifiedBody = '🎤 Voice Recording';
				break;
			case MessageTypes.REVOKED:
				stringifiedBody = '🚫 Deleted message';
				break;
			case MessageTypes.DOCUMENT:
				stringifiedBody = '📃 Docuemnt';
				break;
			case MessageTypes.AUDIO:
				stringifiedBody = '⏺ Audio Recording';
				break;
			case MessageTypes.CONTACT_CARD:
				let contact = await msg.getContact();
				stringifiedBody = `👤 ${contact.name || contact.pushname}: ${contact.number}`;
				break;
			case MessageTypes.CONTACT_CARD_MULTI:
				stringifiedBody = `👥 Contact List`;
				break;
		}
		return stringifiedBody;
	}
}

export default Chats;