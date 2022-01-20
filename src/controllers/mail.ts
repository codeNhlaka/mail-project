import { Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt";
import { EmailsInterface } from '../models/emails';
import { UserDocument, users } from '../models/users';
import { inboxes, InboxInterface } from '../models/inboxes';


/**
 * Send email route
 * @route POST /sendemail
 */


export async function sendEmail(req: Request, res: Response){
    if (req.isAuthenticated()){

        const body = req.body;
        const { subject, message, recipients } = body;

        const nonExistingRecipients: string[] = [];

        
        // create email id
        const EId: string = `${uuidv4()}-${body.from}`;

        // config email 
        const timestamp = new Date().getTime();
        
        const Email:EmailsInterface = {
            id: EId,
            from: req.user.email,
            recipients,
            subject,
            message,
            timestamp
        }


        function pushToInbox(targetId: string){
            for(let i = 0; i <= inboxes.length - 1; i++){
                if (inboxes[i].id === targetId){
                    inboxes[i].emails.push(Email);
                }
            }
        }
        
        // find each recipient, get their inbox ids
        const inboxIds: string[] = [];

        recipients.forEach((recipient: string) => {
            const candidate = users.filter(user => user.email === recipient);
            
            if (candidate.length === 1){

                const target = candidate[0];
                pushToInbox(target.inboxId);

            } else {
                nonExistingRecipients.push(recipient);
            }
        });

        res.send("Email sent successfully");
        return;
    }

    res.send("not authorised");
}