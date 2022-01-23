import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
import { UserDocument, users } from "../models/users";
import { inboxes, InboxInterface } from "../models/inboxes";
import { trash, TrashInterface } from '../models/trash';
import { Encrypt } from '../utils/encrypt';


interface IdInterface {
    id: string;
    inboxId: string;
}

/**
 * generates ids and checks for duplications, if any are present - repeats the same process
 * @returns id, inboxId
 */

function generateId(): IdInterface {
    let id = uuidv4(),
    inboxId = uuidv4();

    users.forEach(user => {
        if (user.id === id || user.inboxId === inboxId){
            return generateId();
        }
    });

    return {
        id,
        inboxId
    }
}  

/**
 * Sign out route
 * @route GET /signout
 */

export function signOut(req: Request, res: Response){
    req.logout();
    res.send("Logged out");
}


/**
 * Sign in route
 * @route POST /signin
 */

export async function signUp(req: Request, res: Response){
    const { name, email, password } = req.body;

    // check for duplicate

    const duplicates = users.filter(targetUser => targetUser.email === email);

    if (duplicates.length){
        res.send("Email already registered");
        return;
    }

    const encrypt = new Encrypt();
    const hashedPassword = await encrypt.hash(password);

    const { id, inboxId } = generateId();

    const hashedUserId = await encrypt.hash(id);
    const hashedUserInboxId = await encrypt.hash(inboxId);

    const currentData:UserDocument = {
        id: hashedUserId,
        name,
        email,
        auth: {
            password: hashedPassword
        },
        inboxId: hashedUserInboxId
    }

    // store user details

    users.push(currentData);

    // store new inbox data
    
    const inbox:InboxInterface = {
        id: hashedUserInboxId,
        emails: []
    }

    inboxes.push(inbox);

    // config trash and store it

    const userTrash:TrashInterface = {
        id: `${uuidv4()}-${email}`,
        userId: hashedUserId,
        emails: []
    }

    trash.push(userTrash);

    res.send("Account created successfully");
}

export async function signIn(req: Request, res: Response, next: NextFunction){
    if (req.isAuthenticated()){
        res.send("You're already signed in");
        return;
    }

    passport.authenticate("local", (error, user, info) => {
        if (error) next(error);

        if(user){
            req.logIn(user, (err) => {
                if (err) next(err);
                res.send("Authentication success");
                return;
            });
        } else {
            res.end(info.message);
            return;
        }
        
    })(req, res, next);

}