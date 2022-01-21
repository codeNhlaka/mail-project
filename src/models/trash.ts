import { EmailsInterface } from './emails';

export interface TrashInterface {
    id: string;
    userId: string;
    emails: EmailsInterface[]
}

export const trash: TrashInterface[] = [{
    id: "1",
    userId: "b2206b45-2cec-4936-bd41-909860a104b0",
    emails: []
}, {
    id: "2",
    userId: "e3b37b8f-56bf-4235-bb50-b6eaf8173794",
    emails: []
},
{
    id: "3",
    userId: "0598570b-af4f-4eca-ad76-bdab9c0609cd",
    emails: []
}];
