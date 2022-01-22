import passport from "passport";
import passportLocal from "passport-local";
import { UserDocument, users } from "../models/users";
import { Encrypt } from '../utils/encrypt';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user:UserDocument, done) => done(null, user));

passport.use(new LocalStrategy({ usernameField: "email"}, 
    async function(email, password, done){

        // find user
        const targetAccount = users.filter(user => user.email === email);
        
        if(targetAccount.length){
            const encrypt = new Encrypt();

            const targetUser = targetAccount[0];

            const result = await encrypt.compare(password, targetUser.auth.password);
    
            if(result){
                return done(null, targetUser);
            } else {
                return done(null, undefined, { message: "invalid credentials"})
            }
        } else {
            return done(null, undefined, { message: "no user found"})
        }

        
    }
))
