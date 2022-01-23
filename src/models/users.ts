export interface UserDocument {
    id: string;
    name: string;
    email: string;
    password: string;
    inboxId: string;
}

export const users: UserDocument[] = [];