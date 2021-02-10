import mongoose from 'mongoose';

 mongoose.Promise = global.Promise;

 export default {

     connect() {
         mongoose.connect('mongodb://localhost:27017/usercrud', { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
             if(!err)
            console.log("DB Connected Successfully.....");
             else
             console.log('Error in DB'+ JSON.stringify(err, undefined, 2));
         });
     }
 }