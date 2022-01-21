import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { LabelInterface, labels } from '../models/labels';
import { EmailsInterface } from '../models/emails';
import { InboxInterface, inboxes } from '../models/inboxes';

/**
 * Create label route
 * @route POST /labels/create
 */

export function createLabel(req: Request, res: Response){
    if (req.isAuthenticated()){

        const { user, body } = req;
        const { name } = body;
        const { id } = user;

        // create label
        const LId = uuidv4();

        const userLabel:LabelInterface = {
            id: LId,
            userId: id,
            name,
            emails: []
        }

        labels.push(userLabel);

        res.send(`${name} label has been created successfully`);
        return;
    }

    res.send("Not authorised");
    
}

/**
 * Delete label route
 * @route Delete /labels/delete/:name
 */

export function deleteLabel(req: Request, res: Response){
    if (req.isAuthenticated()){

        const { user } = req;
        const { name } = req.params;

        // get label 
        const label:LabelInterface[] = labels.filter(targetLable => targetLable.name === name && targetLable.userId === user.id);

        // delete label
        if (label.length){

            const targetLabel:LabelInterface = label[0];
            const index: number = labels.indexOf(targetLabel);
            
            labels.splice(index, 1);

            // get user inbox

            const userInbox = inboxes.filter(targetIbox => targetIbox.id === user.inboxId)[0];

            // get user user emails 
            
            const { emails } = userInbox;

            // find all emails under label

            const targetEmails = emails.filter(targetEmail => targetEmail.label === name);

            if (targetEmails.length){
                // for each email under label, change label to undefined

                targetEmails.forEach(tEmail => {
                    tEmail.label = undefined;
                })
            }

            res.send(`${name} label has been deleted successfully`);
            return;

        }

        res.send("It appears you don't have such a label");
        return;
    }

    res.send("Not authorised");
}

/**
 * Add label to email route
 * @route PUT /labels/:name/attach/:EId
 */

export function attachLabel(req: Request, res:Response){
    if (req.isAuthenticated()){
        const { user } = req;
        const { name, EId } = req.params;

        // get label
        const targetLabel: LabelInterface[] = labels.filter(targetLabel => targetLabel.name === name && targetLabel.userId === user.id);

        if (targetLabel.length){
            const label:LabelInterface = targetLabel[0];

            // find user inbox
            const userInbox: InboxInterface = inboxes.filter(targetInbox => targetInbox.id === user.inboxId)[0];

            // find email where id === EId
            const emails = userInbox.emails;

            const targetEmail:EmailsInterface[] = emails.filter(targetEmail => targetEmail.id === EId);

            if (targetEmail.length){

                // attach label to email

                const email:EmailsInterface = targetEmail[0];
                email.label = name;

                // push email to label emails

                label.emails.push(email.id);
                res.send(`Attached label ${name} to ${email.id}`);
                return;

            } else {
                res.send("Invalid email id");
                return;
            }
        } else {
            res.send(`${name} label does not exist`);
            return;
        }

    }

    res.send("Not authorised");
}

/**
 * Remove label from email route
 * @route DELETE /labels/:name/remove/:EId
 */

export function removeLabel(req: Request, res: Response){
    if (req.isAuthenticated()){
        const { user } = req;
        const { name, EId } = req.params;
    
        // get user inbox

        const userInbox: InboxInterface = inboxes.filter(targetInbox => targetInbox.id === user.inboxId)[0];

        // get email where id === EId && label === [name]

        const { emails } = userInbox;

        if (emails.length){

            const targetEmail = emails.filter(targetEmail => targetEmail.label === name);
            console.log(targetEmail)
            const email = targetEmail.length ? targetEmail[0] : null;

            if (email){
                // remove label from email

                email.label = undefined;

                // find label 

                const targetLabel = labels.filter(targetLable => targetLable.name === name && targetLable.userId === user.id);
                const label = targetLabel.length ? targetLabel[0] : null;

                if (label){
                    
                    // get emails under label and find the target email

                    const labelEmails = label.emails;
                    const targetLabelEmail = labelEmails.filter(localEmail => localEmail === email.id)[0];

                    // get index of target email

                    const index = labelEmails.indexOf(targetLabelEmail);

                    // remove email id from label emails

                    labelEmails.splice(index, 1);

                    res.send(`Lable ${name} removed from ${EId} successfully`);
                    return;
                    
                } else {
                    "No label found"
                }

            } else {
                res.send("No email found with matching id");
                return;
            }
            
        } else {
            res.send("No emails found in your inbox");
            return;
        }
    }

    res.send("Not authorised");
}

/**
 * Get all emails under labelroute
 * @route GET /labels/:name
 */

export function getLabelEmails(req: Request, res: Response){
    if (req.isAuthenticated()){
        const { user } = req;
        const { name } = req.params;

        // get label
        const label = labels.filter(targetLabel => targetLabel.name === name && targetLabel.userId === user.id)[0];

        if (label){
            
            // get inbox
            const userInbox: InboxInterface = inboxes.filter(targetInbox => targetInbox.id === user.inboxId)[0];

            // get emails 
            const { emails } = userInbox;

            const targetEmails = emails.filter(email => email.label === name);

            // check if there are emails with label [name]
            if (!targetEmails.length) {
                res.send(`No emails under the ${name} label`);
                return;
            }

            res.json(targetEmails);
            return;
        } else {
            res.send(`${name} label does not exist`);
            return;
        }
    }

    res.send("Not authorised");
}   