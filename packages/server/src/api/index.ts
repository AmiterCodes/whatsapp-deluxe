import { Client, ClientSession } from 'whatsapp-web.js'
import ChatsService from "./services/chat";
// @ts-ignore
import qrcode from 'qrcode-terminal';
import Emitter from '../utils/emitter';

declare var process: {
    env: {
        DEBUG: boolean;
    }
}


interface WhatsAppDeluxeAPIEvents {
    initialize: boolean;
}

class WhatsAppDeluxeAPI {
	private client!: Client;
    public chats = new ChatsService();
    public readonly emitter = new Emitter<WhatsAppDeluxeAPIEvents>();
    private _isInitialized = false;
	public get isInitialized() {
		return this._isInitialized;
	}
	public initialize(session?: ClientSession) {
        this.client = new Client({
			session,
            puppeteer: {
                headless: !process.env.DEBUG
            }
        })
        this.client.initialize();

        this.client.on('qr', qr => {
            qrcode.generate(qr, {small: true})
        })

        this.client.on('ready', () => {
            this._isInitialized = true;
            this.emitter.call("initialize", true);
        })

        this.chats.initialize(this.client);
	}
}

export default new WhatsAppDeluxeAPI();