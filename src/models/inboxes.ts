import { EmailsInterface } from './emails';

export interface InboxInterface {
    id: string;
    emails: EmailsInterface[];
}

export const inboxes: InboxInterface[] = [{
    id: "1db654f0-4317-49aa-913c-6f4e3390926d",
    emails: [  {
        id: '08bd8ec3-273a-4e7e-87ed-8074c6e3e842-kevin@domain.com',
        from: 'kevin@domain.com',
        userId: '0598570b-af4f-4eca-ad76-bdab9c0609cd',
        recipients: ['thami@domain.com', 'prince@domain.com' ],
        subject: 'Greeting',
        message: "Hello, We're good this side",
        timestamp: 1642705303029
      }]
},{
    id: "422069c9-0f8b-4d13-a853-f69bd49c2d7b",
    emails: [  {
        id: '08bd8ec3-273a-4e7e-87ed-8074c6e3e846-kevin@domain.com',
        from: 'kevin@domain.com',
        userId: '0598570b-af4f-4eca-ad76-bdab9c0609cd',
        recipients: ['thami@domain.com', 'prince@domain.com' ],
        subject: 'Greeting',
        message: "Hello, We're good this side",
        timestamp: 1642705303029
      }, {
        id: '08bd8ec3-273a-4e7e-87ed-8074c6e3e841-kevin@domain.com',
        from: 'kevin@domain.com',
        userId: '0598570b-af4f-4eca-ad76-bdab9c0609cd',
        recipients: ['thami@domain.com', 'prince@domain.com' ],
        subject: 'Reminder',
        message: "I am on my way",
        timestamp: 1642705303029
      }]
},{
    id: "ea3bdc8d-1ccf-423c-af82-6e04dccabb0c",
    emails: []
}];