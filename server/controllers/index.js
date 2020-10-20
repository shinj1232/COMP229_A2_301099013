let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the user Model instance
let userModel = require('../models/user');
let user = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me' });
}
module.exports.displayProjectPage = (req, res, next) => {
    res.render('index', { title: 'Projects' });
}
module.exports.displayServicePage = (req, res, next) => {
    res.render('index', { title: 'Services' });
}
module.exports.displayServicePage = (req, res, next) => {
    res.render('index', { title: 'Services' });
}
module.exports.displayLoginPage = (req,res, next) => {
    //check if the user is aready logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) =>{
        // server err?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error')
            return res.redirect('/login');
        }
        req.login(user, (err) =>{
            //server err?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });

    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    //check if the user is not aready logged in
    if(!req.user)
    {
        res.render('auth/register',{
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else 
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user obj 
    let newUser = new userModel.User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    user.register(newUser, req.body.password, (err)=>{
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash
                (
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: user Already Exists!')
            }
            return res.render('auth/register',{
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            });
        }
        else 
        {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () =>{
                res.redirect('/')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/contact-list');
}