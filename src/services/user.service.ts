import { inboxes } from '../models/inboxes';
import { UserDocument, users } from '../models/users';

export class User {
    declare private readonly id: string;

    constructor(id: string){
        this.id = id;
    }

    getUser = () => {

        // gat user data

        const user:UserDocument = users.filter(targetUser => targetUser.id === this.id)[0];
        
        if (user){

            const userInbox = inboxes.filter(targetInbox => targetInbox.id === user.inboxId)[0];

            const { emails } = userInbox;

            return {
                user,
                userInbox,
                emails,
            }
        }

        return null
    }
}