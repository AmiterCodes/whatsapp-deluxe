import { Client, ClientSession } from 'whatsapp-web.js'
import ChatsService from "./services/chat";
import ContactService from './services/contact'
import MessagesService from './services/message'
// @ts-ignore
import qrcode from 'qrcode-terminal';
import Emitter from '../utils/emitter';
import { runScripts } from '../scripts/';

declare var process: {
    env: {
        DEBUG: boolean;
    }
}


interface WhatsAppDeluxeAPIEvents {
    initialize: boolean;
}

class WhatsAppDeluxeAPI {
	public client!: Client;
    public chats = new ChatsService();
    public contacts = new ContactService();
    public messages = new MessagesService();

    public readonly emitter = new Emitter<WhatsAppDeluxeAPIEvents>();
    private _isInitialized = false;
	public get isInitialized() {
		return this._isInitialized;
	}
	public initialize(session?: ClientSession) {
        this.client = new Client({
			session,
            puppeteer: {
                headless: false
            }
        })
        this.client.initialize();

        this.client.on('qr', qr => {
            qrcode.generate(qr, {small: true})
        })

        this.client.on('ready', () => {
            this._isInitialized = true;
            this.emitter.call("initialize", true);
            
            runScripts();
        })

        this.contacts.initialize(this.client);
        this.chats.initialize(this.client);
        this.messages.initialize(this.client);

	}
}

export default new WhatsAppDeluxeAPI();