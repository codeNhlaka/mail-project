import { EmailsInterface } from './emails';

export interface InboxInterface {
    id: string;
    emails: EmailsInterface[];
}

export const inboxes: InboxInterface[] = [{
    id: "1db654f0-4317-49aa-913c-6f4e3390926d",
    emails: []
},{
    id: "422069c9-0f8b-4d13-a853-f69bd49c2d7b",
    emails: []
},{
    id: "ea3bdc8d-1ccf-423c-af82-6e04dccabb0c",
    emails: []
}];