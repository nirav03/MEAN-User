import { Register } from './register.model.mjs'
import bcrypt from "bcrypt";
import {Passport} from "../config/passport.mjs";
import jwt from 'jsonwebtoken';
import { AppConstant } from "../utilities/app.constants.mjs";

export default class RegisterController {

    constructor() {

    }

  create(req, res){
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let register = new Register(req.body);
  //    let register = new Register({
  //   firstName : req.body.firstName,
  //   lastName  : req.body.lastName,
  //   email     : req.body.email,
  //   password  : bcrypt.hashSync(req.body.password, 10)
  // });
    Register.findOne({email: req.body.email}, (err, email) => {
      if(err)
      return res.json(err.message).status(400);
      if(email)
        {
             res.status(200).json({message: 'Email already Exist', status_code : 200, status: 0})
        }
     if(!email) {
         register.save((err, doc) => {
         if(!err)
         res.send(doc).status(200);
         else
          {
          console.log('Error in adding user' + JSON.stringify(err, undefined,2));  
          res.status(400).send(err).json({message: 'Registration Unsuccessful', status_code: 200, status: 1});
          }
         });
         }
    });
  }

  login(req,res,next){
    Passport.authenticate('local', function(err, register, info) {
      if (err) { return res.status(501).json(err); }
      if (!register) { 
         res.status(200).json({message : 'Incorrect Email', status_code: 202, status: 0});
         }
    
      if (register) {
        bcrypt.compare(req.body.password, register.password).then((isMatch, err) => {
        if (err) {return res.status(501).json(err);}
        if (isMatch) {
          const token = jwt.sign({ email: register.email }, AppConstant.secret ,
             {expiresIn: 86400 },
             (err, token) => {
                 res.json({token, password: register.password, message: 'Login Success', status_code: 200, status: 1});
                 console.log("Token:", token);
                 });

        } else {
          res.status(200).json({message : 'Incorrect Password', status_code: 200, status: 0});
        }
    })
    }
    })(req, res, next);
  };

}