import { inboxes, InboxInterface } from '../models/inboxes';
import { trash, TrashInterface } from '../models/trash';
import { UserDocument, users } from '../models/users';

export class User {
    declare private readonly id: string;
    declare private readonly user: UserDocument;
    declare private readonly inbox: InboxInterface;
    declare private readonly trash: TrashInterface;

    constructor(id: string){
        this.id = id;
        this.user = users.filter(targetUser => targetUser.id === this.id)[0];
        this.inbox = inboxes.filter(targetInbox => targetInbox.id === this.user.inboxId)[0];
        this.trash = trash.filter(targetTrash => targetTrash.userId === this.id)[0];
    }

    getEmailFromTrash = (EId: string) => {

        const { emails } = this.trash;
        
        const targetEmail = emails.filter(email => email.id === EId);
        const email = targetEmail.length ? targetEmail[0] : null;

        return email;
    }

    getEmailFromInbox = (EId: string) => {

        const { emails } = this.inbox;
        
        const targetEmail = emails.filter(email => email.id === EId);
        const email = targetEmail.length ? targetEmail[0] : null;

        return email;
    }

    getUser = () => {

        if (this.user){
            return {
                user: this.user,
                userInbox: this.inbox,
                emails: this.inbox.emails,
                userTrash: this.trash
            }
        }

        return null
    }
}