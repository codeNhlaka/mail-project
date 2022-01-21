import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { LabelInterface, labels } from '../models/labels';

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
        console.log(labels);

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
            console.log(labels);
            return;
        }

        res.send("It appears you don't have such a label");
        return;
    }

    res.send("Not authorised");
}

