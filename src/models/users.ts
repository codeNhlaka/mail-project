export interface UserDocument {
    id: string;
    name: string;
    email: string;
    auth: {
        password: string;
    };
    inboxId: string;
}

const user: UserDocument = {
    id: "some-spring",
    name: "Don",
    email: "don@domain.com",
    auth: {
        password: "123"
    },
    inboxId: "2"
}

export const users: [UserDocument] = [user];