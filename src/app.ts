import express from "express";
import passport from "passport";
import session from "express-session";
import { SessionInterface } from './interfaces/session.interface';
import bodyParser from "body-parser";
import "./config/passport";
import { signIn, signUp } from "./controllers/auth.controller";
import { sendEmail, getEmails } from "./controllers/mail.controller";

declare global {
    namespace Express {
      interface User {
        email: string;
        id: string;
        inboxId: string;
      }
    }
  }

const app = express();

const sess: SessionInterface = {
    secret: 'mailer',
    cookie: {}
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
  
app.use(session({
    ...sess,
    saveUninitialized: false,
    resave: false
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/signup', signUp);
app.post('/signin', signIn);
app.post('/mail/send', sendEmail);
app.get('/mail/get', getEmails);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app running at port ${PORT}`));