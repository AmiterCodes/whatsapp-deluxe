import { Client, ClientSession } from 'whatsapp-web.js'
import ChatsService from "./services/chat";
// @ts-ignore
import qrcode from 'qrcode-terminal';

declare var process: {
    env: {
        DEBUG: boolean;
    }
}


class WhatsAppDeluxeAPI {
	private client!: Client;
    public chats = new ChatsService();

	public intialize(session?: ClientSession) {
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
            console.log('READY')
        })

        this.chats.intialize(this.client);
	}
}

export default new WhatsAppDeluxeAPI();