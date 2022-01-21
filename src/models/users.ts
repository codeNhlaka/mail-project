export interface UserDocument {
    id: string;
    name: string;
    email: string;
    auth: {
        password: string;
    };
    inboxId: string;
}

export const users: UserDocument[] = [];