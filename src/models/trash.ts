import { EmailsInterface } from './emails';

export interface TrashInterface {
    id: string;
    userId: string;
    emails: EmailsInterface[]
}

export const trash: TrashInterface[] = [];