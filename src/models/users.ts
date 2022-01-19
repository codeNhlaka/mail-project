export interface UserDocument {
    id: number;
    name: string;
    email: string;
    auth: {
        password: string;
    };
    accountId: string;
    inboxId: string;
}

const user: UserDocument = {
    id: 1,
    name: "Don",
    email: "don@domain.com",
    auth: {
        password: "123"
    },
    accountId: "1",
    inboxId: "2"
}

export const users: [UserDocument] = [user];