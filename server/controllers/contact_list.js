let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Contact = require('../models/contact');

module.exports.displayContactList = (req, res, next)=>{
    Contact.find((err, contactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //return console.log(ContactList);
            res.render('index', 
            {title: 'Contact List', 
            ContactList: contactList, 
            displayName: req.user ? req.user.displayName : ''});
        }

    }).sort({ Name: 'desc'});
}

module.exports.displayAddPage = (req,res,next) =>{
    res.render('index', {title: 'Contact Add', displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req,res,next) =>{
    let newContact = Contact({
        "Name": req.body.name,
        "Contact_Number": req.body.phone,
        "Email_Address": req.body.email
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/contact-list');
        }
    });
}
module.exports.displayEditPage = (req,res,next) =>{
    let id = req.params.id;

    Contact.findById(id, (err,contactToEdit ) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.render('index', {title: 'Edit Contact',  ContactList: contactToEdit, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req,res,next) =>{
    let id = req.params.id;

    let updatedContact =  Contact({
        "_id":id,
        "Name": req.body.name,
        "Contact_Number": req.body.phone,
        "Email_Address": req.body.email
    });
    Contact.updateOne({_id: id,}, updatedContact,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id;
    Contact.remove({_id: id}, (err)=> {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
}