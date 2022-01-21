import express from "express";
import passport from "passport";
import session from "express-session";
import { SessionInterface } from './interfaces/session.interface';
import bodyParser from "body-parser";
import "./config/passport";
import { signIn, signUp } from "./controllers/auth.controller";
import { sendEmail, getEmails, deleteEmail, recoverEmail } from "./controllers/mail.controller";
import { createLabel, deleteLabel, attachLabel, removeLabel, getLabelEmails } from './controllers/labels.controller';
import * as dotenv from "dotenv";

dotenv.config();

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

// --------------- Auth Routes ------------------ //

app.post('/signup', signUp);
app.post('/signin', signIn);

// --------------- Mail Routes ------------------ //

app.post('/mail/send', sendEmail);
app.get('/mail/get', getEmails);
app.delete('/mail/delete/:id', deleteEmail);
app.put('/mail/recover/:id', recoverEmail);

// --------------- Label Routes ------------------ //

app.post('/labels/create', createLabel);
app.delete('/labels/delete/:name', deleteLabel);
app.put('/labels/:name/attach/:EId', attachLabel);
app.delete('/labels/:name/remove/:EId', removeLabel);
app.get('/labels/:name', getLabelEmails);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app running at port ${PORT}`));