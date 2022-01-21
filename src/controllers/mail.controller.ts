import { Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt";
import { emails, EmailsInterface } from '../models/emails';
import { UserDocument, users } from '../models/users';
import { inboxes, InboxInterface } from '../models/inboxes';
import { MailService } from '../services/mail.service';
import { trash, TrashInterface } from '../models/trash';


/**
 * Send email route
 * @route POST /mail/send
 */


export async function sendEmail(req: Request, res: Response){
    if (req.isAuthenticated()){
        const mailservice = new MailService();

        const body = req.body;
        const { subject, message, recipients } = body;

        const nonExistingRecipients: string[] = [];

        
        // create email id
        const EId: string = `${uuidv4()}-${req.user.email}`;

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

    res.send("Not authorised");
}

/**
 * Get all emails 
 * @route GET /mail/get
 */

export function getEmails(req: Request, res: Response){
    if (req.isAuthenticated()){

        const userInboxId = req.user.inboxId;

        const userInbox = inboxes.filter(targetInbox => targetInbox.id === userInboxId)

        res.json({
            inbox: userInbox[0].emails
        });

        return;
    }

    res.send("Not authorised");
}

/**
 * Delete email route
 * @route DELETE /mail/delete/:id
 */

export function deleteEmail(req: Request, res: Response){
    if (req.isAuthenticated()){
        const { user } = req; 

        const { id } = req.params;

        const inbox = inboxes.filter(currentInbox => currentInbox.id === user.inboxId)[0];
        const { emails } = inbox;
        
        const targetEmail = emails.filter(email => email.id === id);

        if (targetEmail.length){
            const email = targetEmail[0];
            const index = emails.indexOf(email);

            // find user trash
            const userTrash = trash.filter(targetTrash => targetTrash.userId === user.id)[0];

            // add email to trash
            userTrash.emails.push(email);

            // delete email
            emails.splice(index, 1);
            res.send("Email has been moved to trash");
            return;
        }

        res.send("Invalid email id");
        return;
    }

    res.send("not authorised");
}


/**
 * Recover email route
 * @route PUT /mail/recover/:id
 */

export function recoverEmail(req: Request, res: Response){
    if (req.isAuthenticated()){
        
        const { user } = req; 
        const { id } = req.params;

        // get user trashed emails 
        const userTrash:TrashInterface[] = trash.filter(targetUserTrash => targetUserTrash.userId === user.id);

        if (userTrash.length){
            const { emails } = userTrash[0];

            // find email with matching id
            const targetEmail: EmailsInterface[] = emails.filter(targetEmail => targetEmail.id === id);

            if (targetEmail.length){

                // recover email
                const email:EmailsInterface = targetEmail[0];
                const index:number = emails.indexOf(email);

                // get user inbox and push email back
                const { inboxId } = req.user;
                const userInbox:InboxInterface = inboxes.filter(targetInbox => targetInbox.id === inboxId)[0];

                userInbox.emails.push(email);

                res.send("Email recovered successfully");
                return;
            }

            res.send("Invalid email id");
            return;
        }
    }

    res.send("not authorised");
}

