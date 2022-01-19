import passport from "passport";
import passportLocal from "passport-local";
import { UserDocument, users } from "../models/users";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user:UserDocument, done) => done(null, user))

passport.use(new LocalStrategy({ usernameField: "email"}, 
    function(email, password, done){

        users.forEach(user => {
            if (email === user.email){
                done(null, user);
            }
        })

        done(null, undefined)
    }
))
