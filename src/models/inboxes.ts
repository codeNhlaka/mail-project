import { EmailsInterface } from './emails';

export interface InboxInterface {
    id: string;
    emails: EmailsInterface[];
}

export const inboxes: InboxInterface[] = [];