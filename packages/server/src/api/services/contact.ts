import { WhatsAppDeluxeAPIService } from "../service";
import { Contact as ViewContact } from "@whatsapp-deluxe/shared/src/shared/contact";
import { Contact as WhatsAppContact } from "whatsapp-web.js";

interface ContactEvents {

}

class UserContacts extends WhatsAppDeluxeAPIService<ContactEvents> {
    contacts: Array<WhatsAppContact> = []

    private async fillContacts() {
        this.contacts = (await this.client.getContacts()).filter(contact => contact.isUser);
    }

    public getNameByNumber(num: string) : string {
        let contact = this.contacts.find(contact => contact.id.user === num);
        if(!contact) return num;
        if(contact.name) return contact.name;
        if(contact.pushname) return contact.pushname;
        return num;
    }

    serviceDidInitialized() {
        this.fillContacts();
    }
}

export default UserContacts;