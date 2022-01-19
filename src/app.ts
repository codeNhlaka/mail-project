import express from "express";
import passport from "passport";
import session from "express-session";
import { SessionInterface } from './interfaces/session.interface';
import bodyParser from "body-parser";
import "./config/passport";

const app = express();

var sess: SessionInterface = {
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

app.get('/', (req, res) => {
    if (req.isAuthenticated()){
        res.send("welcome");
        return;
    }

    res.send("not authorized");
});

app.post('/login', passport.authenticate("local"), (req, res) => {
    res.send("Authentication Success");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app running at port ${PORT}`));