import mongoose from 'mongoose';

var user = mongoose.model('user', {

    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: Number,
        min: [10, "Min 10 numbers required"]
    },
    birthdate: {
        type: String,
       },
    gender: {
        type: String
    },
    state: {
        type: String
    },
    address: {
        type: String
    }

});

export const User = user;
