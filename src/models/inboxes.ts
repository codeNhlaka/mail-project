interface InboxInterface {
    id: string;
    userId: string;
}

const inbox:InboxInterface = {
    id: "1",
    userId: "3"
}

export const inboxes: [InboxInterface] = [inbox];