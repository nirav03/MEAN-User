import passport from 'passport';
import passportLocal from 'passport-local';
import {Register} from "../register/register.model.mjs";

const LocalStrategy = passportLocal.Strategy;
passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function (username, password, done) {
        Register.findOne({ email: username }, {email: 1, password: 1}, function (err, register) {
            if (err) { return done(err); }
            if (!register) {
                return done(null, false, { message: 'Incorrect username.' });
            } else {
                return done(null, register, { message: 'Success' });
            }
        });
    }
));

  
  export const Passport = passport;