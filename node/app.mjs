import express from 'express';
import bodyParser from 'body-parser';
import DB from "./config/db.mjs";
import { AppConstant } from './utilities/app.constants.mjs';
import Router from "./routes/routes.mjs";
import cors from 'cors';

export default class App {

    constructor(){
        const app = express();
        this.app = app;
        this.config();
     
       
    }
    
   
    config(){

        // Database Connection
        DB.connect();

        // Define Middleware
        this.app.use((err, req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
           );
            res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, GET, DELETE, OPTIONS"
           );
           if (err.name === "UnauthorizedError") {
          res.send(err);
           }
           next();
           });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(cors({origin: "http://localhost:4200"}));

        // define route
        new Router(this.app);
       
        //create server
        this.app.listen(AppConstant.APPPORT, (err) => {
            if(!err)
            console.log(`Server is running at PORT http://localhost:${AppConstant.APPPORT}`);
            else
            console.log("Connection failed :" + JSON.stringify(err, undefined, 2))
        });
    }
}