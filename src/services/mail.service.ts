import { inboxes } from "../models/inboxes";
import { EmailsInterface } from '../models/emails';

export class MailService {

    // locates the right inbox then add the email

    pushToInbox = (targetId: string, e:EmailsInterface) => {
        for(let i = 0; i <= inboxes.length - 1; i++){
            if (inboxes[i].id === targetId){
                inboxes[i].emails.push(e);
                return;
            }
        }
    }

}