//require modules for the usermodel
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: 'username is required'
        },
        /*
        password:
        {
            type: String,
            default: '';
            trime: true,
            required: 'password is required'
        }
         */
        email:
        {
            type: String,
            default: '',
            trime: true,
            required: 'email is required'
        },
        displayName:
        {
            type: String,
            default: '',
            required: 'email address is required'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

//configure options for user model

let options = ({missingPasswordError: 'Wrong/ Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);