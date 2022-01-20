import { Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt";
import { emails, EmailsInterface } from '../models/emails';
import { UserDocument, users } from '../models/users';
import { inboxes, InboxInterface } from '../models/inboxes';
import { MailService } from '../services/mail.service';


/**
 * Send email route
 * @route POST /sendemail
 */


export async function sendEmail(req: Request, res: Response){
    if (req.isAuthenticated()){
        const mailservice = new MailService();

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
            userId: req.user.id,
            recipients,
            subject,
            message,
            timestamp
        }
        
        // find each recipient, get their inbox ids
        const inboxIds: string[] = [];

        recipients.forEach((recipient: string) => {
            const candidate = users.filter(user => user.email === recipient);
            
            if (candidate.length === 1){

                const target = candidate[0];

                // push email to their inboxes
                mailservice.pushToInbox(target.inboxId, Email)

            } else {
                nonExistingRecipients.push(recipient);
            }
        });

        emails.push(Email);

        if (nonExistingRecipients.length){ // check if there are invalid address
            res.json({
                "invalid-addresses": nonExistingRecipients,
                message: "Email sent only to the valid addresses"
            });
            
            return;
        }

        res.send("Email sent successfully");
        return;
    }

    res.send("not authorised");
}