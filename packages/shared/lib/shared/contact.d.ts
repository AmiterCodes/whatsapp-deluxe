export interface Contact {
    /** Contact's phone number */
    number: string;
    /** Indicates if the contact is a business contact */
    isBusiness: boolean;
    /** ID that represents the contact */
    id: string;
    /** Indicates if the contact is an enterprise contact */
    isEnterprise: boolean;
    /** Indicates if the contact is the current user's contact */
    isMe: boolean;
    /** Indicates if the number is saved in the current phone's contacts */
    isMyContact: boolean;
    /** Indicates if the number is registered on WhatsApp */
    isWAContact: boolean;
    /** Indicates if you have blocked this contact */
    isBlocked: boolean;
    /** The contact's name, as saved by the current user */
    name?: string;
    /** The name that the contact has configured to be shown publically */
    pushname: string;
    /** A shortened version of name */
    shortName?: string;
}
export interface Participant {
    name?: string;
    pushname: string;
    chatId: string;
    isAdmin: boolean;
    profilePicture?: string;
}
