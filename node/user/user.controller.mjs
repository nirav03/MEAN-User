import { User } from "./user.model.mjs"

export default class UserController {

    constructor(){

    }

    create(req, res){
        console.log(req.body)
        let user = new User(req.body);
        console.log(req.body);
        user.save((err, doc) => {
            if(!err)
            res.send(doc).status(201);
            else
            {
             console.log('Error in adding user' + JSON.stringify(err, undefined,2));
             res.status(400).send(err).json(err.message);
            }
          });
    }

    update(req, res){
        let user = req.body;
        User.findByIdAndUpdate(req.params.id, {$set: user}, {new : true}, (err, doc) => {
          if(!err)
          res.send(doc).status(201);
          else
          {
            res.status(400).send(err).json(err.message);
          console.log('Error in Retrieving user' + JSON.stringify(err, undefined,2));
          }
        })
    }

    getUser(req, res){
        User.findById(req.params.id, (err,docs) => {
          if(!err){
          res.send(docs).status(200)} 
          else
          {
           res.status(400).send(err).json(err.message);
           console.log('Error in Retrieving user' + JSON.stringify(err, undefined,2));
        }
        });
      }

      list(req, res){
        User.find((err,docs) => {
          if(!err)
          res.send(docs).status(200);
          else
          {
            res.status(400).send(err).json(err.message);
            console.log('Error in Retrieving user' + JSON.stringify(err, undefined,2));
          }
        });
      }

      delete(req, res) {
         User.findByIdAndRemove(req.params.id, (err, doc) => {
           if(!err)
             { 
              res.send(doc).status(200);
              console.log(doc);}
           else
           {
             res.status(400).send(err).json(err.message);
             console.log('Error in Retrieving user' + JSON.stringify(err, undefined,2));
           }
         })
       }

}