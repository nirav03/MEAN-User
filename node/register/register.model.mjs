import mongoose from "mongoose";

var register = mongoose.model('register', {

    firstName: {
        type: String,
        required: true
        
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}
);

export const Register = register;