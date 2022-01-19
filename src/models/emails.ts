interface EmailsInterface {
    id: string;
    inboxId: string;
    label?: string;
    from: string;
    to: string;
    timestamp: number;
}

const email:EmailsInterface = {
    id: "1",
    inboxId: "2",
    from: "email@domain.com",
    to: "don@domain.com",
    timestamp: new Date().getTime()
}

export const emails:[EmailsInterface] = [email];