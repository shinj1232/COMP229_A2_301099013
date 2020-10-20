let express = require('express');
let router = express.Router();

module.exports.displayContactPage = function(req, res, next) {
    res.render('index', {title: 'Contact' });
}