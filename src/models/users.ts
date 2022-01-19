export interface UserDocument {
    name: string;
    email: string;
    auth: {
        password: string;
    };
    accountId: string;
    inboxId: string;
}

const user: UserDocument = {
    name: "Don",
    email: "don@domain.com",
    auth: {
        password: "123"
    },
    accountId: "1",
    inboxId: "2"
}

export const users: [UserDocument] = [user];