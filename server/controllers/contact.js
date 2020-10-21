//Hyunjune Shin 301099013 2020-10-20
//controller page for contacts
let express = require('express');
let router = express.Router();

//display the contact page
module.exports.displayContactPage = function(req, res, next) {
    res.render('index', {title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}