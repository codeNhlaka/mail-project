export interface SessionInterface {
    secret: string;
    cookie: {
        secure?: boolean;
    }
}