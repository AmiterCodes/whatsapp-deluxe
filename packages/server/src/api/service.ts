import { Client } from "whatsapp-web.js";

export abstract class WhatsAppDeluxeAPIService {
	public client!: Client;
	private _isIntialized = false;
	public get isIntialized() {
		return this._isIntialized;
	}
	abstract serviceDidIntialized?(): unknown;
	intialize(client: Client) {
		this.client = client;
		this.client.on("ready", () => {
            this._isIntialized = true;
            
		if (this.serviceDidIntialized) {
			this.serviceDidIntialized();
		}
		})
	}
}
