import RegisterController from "../register/register.controller.mjs";
import UserController from "../user/user.controller.mjs";

export default class Router{

    constructor(app){
        this.app = app;
        this.defineRoute();
    }

    defineRoute() {
        
        const Register = new RegisterController();
        const User = new UserController();
        
        // login routes
        this.app.post('/register',Register.create);        // Register User
        this.app.post('/', Register.login);                // Login

        // User List routes
        this.app.route('/user/create').post(User.create);      //user create
        this.app.route('/user/:id').put(User.update);          //user update
        this.app.route('/user/:id').get(User.getUser);         //get user
        this.app.route('/user/:id').delete(User.delete);       //user delete
        this.app.route('/list').get(User.list);                //user list
    }
}