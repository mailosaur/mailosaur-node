// Type definitions for mailosaur v4.0.0
// Project: https://github.com/mailosaur/mailosaur-node
// Definitions by: Brian Mortenson <https://github.com/bgmort/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Mailosaur {
    interface Link {
        href: string;
        text?: string;
    }
    interface Image {
        src: string;
        alt?: string;
    }
    interface EmailUser {
        address: string;
        name: string;
    }
    interface Attachment {
        id: string;
        contentType: string;
        fileName: string;
        contentId: string;
        length: number;
        creationDate: string;
    }
    interface Email {
        html: {
            links: Link[];
            body: string;
            images: Image[];
        };
        text: {
            links: Link[];
            body: string;
        };
        headers: {
            [name: string]: string;
        };
        subject: string;
        priority: string;
        attachments: Attachment[];
        creationdate: string;
        received: string;
        senderhost: string;
        id: string;
        mailbox: string;
        server: string;
        rawid: string;
        from: EmailUser[];
        rcpt: EmailUser[];
        to: EmailUser[];
        cc: EmailUser[];
        bcc: EmailUser[];
    }

    interface MailboxClass {
        prototype: Mailbox;
        new(mailboxId: string): Mailbox;
    }
}

declare class Mailbox {
    constructor(mailboxId: string);
    getEmails(searchPattern: string, cb: (err: any, emails: Mailosaur.Email[]) => void): void;
    getEmails(searchPattern: string): Promise<Mailosaur.Email[]>;
    getEmailsByRecipient(recipient: string, cb: (err: any, emails: Mailosaur.Email[]) => void): void;
    getEmailsByRecipient(recipient: string): Promise<Mailosaur.Email[]>;
    getEmail(email: string, cb: (err: any, emails: Mailosaur.Email[]) => void): void;
    getEmail(email: string): Promise<Mailosaur.Email[]>;
    deleteAllEmail(cb: (err: any) => void): void;
    deleteAllEmail(): Promise<void>;
    deleteEmail(email: string, cb: (err: any) => void): void;
    deleteEmail(email: string): Promise<void>;
    getAttachment(attachmentId: string, cb: (err: any, attachment: ArrayBufferLike) => void): void;
    getAttachment(attachmentId: string): Promise<ArrayBufferLike>;
    getRawEmail(rawId: string, cb: (err: any, emailBuffer: ArrayBufferLike) => void): void;
    getRawEmail(rawId: string): Promise<ArrayBufferLike>;
    generateEmailAddress(): string;
}

declare function Mailosaur(apiKey: string): { Mailbox: Mailosaur.MailboxClass };

export = Mailosaur;
