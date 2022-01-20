export interface EmailsInterface {
    id: string;
    label?: string;
    userId: string;
    from: string;
    recipients: string[];
    subject: string;
    message: string;
    timestamp: number;
}


export const emails: EmailsInterface[] = [
  {
    id: '08bd8ec3-273a-4e7e-87ed-8074c6e3e842-undefined',
    from: 'kevin@domain.com',
    userId: '0598570b-af4f-4eca-ad76-bdab9c0609cd',
    recipients: [ 'thami@domain.com', 'prince@domain.com' ],
    subject: 'Greeting',
    message: "Hello, We're good this side",
    timestamp: 1642705303029
  },
  {
    id: '08bd8ec3-273a-4e7e-87ed-8074c6e3e842-undefined',
    from: 'kevin@domain.com',
    userId: '0598570b-af4f-4eca-ad76-bdab9c0609cd',
    recipients: [ 'thami@domain.com', 'prince@domain.com' ],
    subject: 'Greeting',
    message: "Hello, We're good this side",
    timestamp: 1642705303029
  }
];