export interface EmailsInterface {
    id: string;
    label?: string;
    from: string;
    recipients: string[];
    subject: string;
    message: string;
    timestamp: number;
}


export const emails: EmailsInterface[] = [];