import { Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import { emails, EmailsInterface } from '../models/emails';
import { users } from '../models/users';
import { MailService } from '../services/mail.service';
import { trash, TrashInterface } from '../models/trash';
import { User } from '../services/user.service';


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

        // check if there are invalid address
        if (nonExistingRecipients.length){ 
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

        const { user } = req;

        const userInfo = new User(user.id).getUser();
        
        if (!userInfo){
            res.send("User data not found");
            return;
        }

        res.json({
            inbox: userInfo.emails
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

        const userInfo = new User(user.id).getUser();
        
        if (!userInfo){
            res.send("User data not found");
            return;
        }

        const { id } = req.params;

        const { emails } = userInfo;
        
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

        const userInfo = new User(user.id).getUser();
        
        if (!userInfo){
            res.send("User data not found");
            return;
        }


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

                // push email back user emails

                const userEmails = userInfo.emails;
                userEmails.push(email);

                // remove email from trash
                userTrash.slice(index, 1);

                res.send("Email recovered successfully");
                return;
            }

            res.send("Invalid email id");
            return;
        }
    }

    res.send("not authorised");
}

