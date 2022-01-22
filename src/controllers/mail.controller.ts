import { Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';
import { emails, EmailsInterface } from '../models/emails';
import { users } from '../models/users';
import { MailService } from '../services/mail.service';
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
        
        // get recipients
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

        const userData = new User(user.id);
        const userInfo = userData.getUser();

        if (!userInfo){
            res.send("User data not found");
            return;
        }

        const { id } = req.params;

        const { emails } = userInfo;
        
        const targetEmail = userData.getEmailFromInbox(id);

        if (targetEmail){

            const email = targetEmail;
            const index = emails.indexOf(email);

            const { userTrash } = userInfo;

            userTrash.emails.push(email);

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
 * Get deleted route
 * @route GET /mail/trash
 */

export function getDeletedMails(req: Request, res: Response){
    if (req.isAuthenticated()){
        
        const { user } = req;

        const userInfo = new User(user.id).getUser();
        
        if (!userInfo){
            res.send("User data not found");
            return;
        }

        const { userTrash } = userInfo;

        if (!userTrash.emails.length){
            res.send("No emails here");
            return;
        }

        res.json(userTrash.emails);
        return;
    }

    res.send("not authorised");
}

/**
 * Recover email route
 * @route PUT /mail/trash/recover/:id
 */

export function recoverEmail(req: Request, res: Response){
    if (req.isAuthenticated()){
        
        const { user } = req; 
        const { id } = req.params;

        const userData = new User(user.id);
        const userInfo = userData.getUser();
        
        if (!userInfo){
            res.send("User data not found");
            return;
        }

        const { userTrash } = userInfo;

        if (userTrash){

            const { emails } = userTrash;

            const targetEmail = userData.getEmailFromTrash(id);

            if (targetEmail){

                const email:EmailsInterface = targetEmail;
                const index:number = emails.indexOf(email);

                // push email back user emails

                const userEmails = userInfo.emails;
                userEmails.push(email);

                // remove email from trash
                userTrash.emails.splice(index, 1);

                res.send("Email recovered successfully");
                return;
            }

            res.send("Invalid email id");
            return;
        }
    }

    res.send("not authorised");
}

