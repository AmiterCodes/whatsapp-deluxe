import { Client } from "whatsapp-web.js";
import Emitter from "../utils/emitter";

export abstract class WhatsAppDeluxeAPIService<Events extends Record<string, any>> {
	public client!: Client;
	private _isInitialized = false;
	public readonly emitter = new Emitter<Events>();
	public get isInitialized() {
		return this._isInitialized;
	}
	abstract serviceDidInitialized?(): unknown;
	initialize(client: Client) {
		this.client = client;
		this.client.on("ready", () => {
            this._isInitialized = true;
            
		if (this.serviceDidInitialized) {
			this.serviceDidInitialized();
		}
		})
	}
}
