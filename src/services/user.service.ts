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

    getEmailInbox = (EId: string) => {

        // get emails from inbox

        const { emails } = this.inbox;
        
        // get email from emails where id === EId

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