//Hyunjune Shin 301099013 
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Contact = require('../models/contact');

// display contact list to contact-list page
module.exports.displayContactList = (req, res, next)=>{

    //check if there is an error
    Contact.find((err, contactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //return console.log(ContactList);
            //pass throught the data
            res.render('index', 
            {title: 'Contact List', 
            ContactList: contactList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    // sorting the buisness contact list in alphabetical order
    }).sort({ Name: 'desc'});
}

//displaying the page to add the contact list
module.exports.displayAddPage = (req,res,next) =>{
    res.render('index', {title: 'Contact Add', displayName: req.user ? req.user.displayName : ''});
}

//processing the add page
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
//displaying the edit page
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

//processing the edited data
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

//processign the delete
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