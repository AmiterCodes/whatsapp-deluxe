import { Chat as WhatsAppChat, Message, MessageTypes, Events, GroupNotification } from "whatsapp-web.js";
import { Chat as ViewChat } from '@whatsapp-deluxe/shared/src/shared/chat'


import { WhatsAppDeluxeAPIService } from "../service";
import { MessagePreview } from "@whatsapp-deluxe/shared/src/shared/message";
import API from "../";
import { Participant } from "@whatsapp-deluxe/shared/src/shared/contact";



interface ChatsEvents {
	newUserViewChats: ViewChat[];
	newGroupViewChats: ViewChat[];
	participantUpdate: { chatId: string, participants: Participant[] }
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
		const messageUpdateEventHandler = async (msg : Message) => {
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
							 chatView,
							 ...this.groupChats.filter(chat => !chat.pinned)];
					}

					this.emitter.call("newGroupViewChats", this.groupChats);
				} else {
					const foundViewChatIndex = this.userChats.findIndex(currentChat => currentChat.id === chatView.id)
					const foundViewChat = this.userChats[foundViewChatIndex];

					if(!foundViewChat.pinned) {
						this.userChats.splice(foundViewChatIndex, 1);
						this.userChats = [...this.userChats.filter(chat => chat.pinned),
							 chatView,
							 ...this.userChats.filter(chat => !chat.pinned)];
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
		} 

		const participantUpdateEventHandler = async (notification: GroupNotification) => {
			let { chatId } = notification;

			this.emitter.call('participantUpdate', { chatId, participants: await this.loadParticipants(chatId) })
		}

		this.client.on(Events.GROUP_JOIN, participantUpdateEventHandler)
		this.client.on(Events.GROUP_LEAVE, participantUpdateEventHandler)

		
		this.client.on(Events.MESSAGE_ACK, messageUpdateEventHandler)
		this.client.on(Events.MESSAGE_REVOKED_EVERYONE, messageUpdateEventHandler)
		this.client.on(Events.MESSAGE_CREATE, messageUpdateEventHandler)
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



    async loadParticipants(chatId: string) : Promise<Array<Participant>> {
		let chat = await this.client.getChatById(chatId);
		if(chat.isGroup) {
			//@ts-ignore
			let participants = [...chat.participants];
            
            return Promise.all(participants.map(participant => this.mapParticipant(participant)))
		} else {
            let contact = { id: { _serialized: chatId }, isAdmin: false };
            let me = { id: { _serialized: this.client.info.wid._serialized }, isAdmin: false };
            return Promise.all([this.mapParticipant(contact), this.mapParticipant(me)])
		}

	}	

	private async mapParticipant(participant: { id: { _serialized: string; }, isAdmin: boolean }) : Promise<Participant> {
        let contact = await this.client.getContactById(participant.id._serialized)

        const { isAdmin } = participant;

        return {
            chatId: contact.id._serialized,
            isAdmin,
            name: contact.name,
            pushname: contact.pushname,
            profilePicture: await contact.getProfilePicUrl()
        }
    }


	private async mapChat (chat: WhatsAppChat): Promise<ViewChat> {
		let messages = await chat.fetchMessages({ limit: 1 })
		let lastMessage: MessagePreview | undefined;
		let imageUrl = undefined;
		if(!chat.isGroup)
			imageUrl = await this.client.getProfilePicUrl(chat.id._serialized);

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
			imageUrl,
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