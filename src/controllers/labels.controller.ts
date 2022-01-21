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