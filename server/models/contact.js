let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    Name: String,
    Contact_Number: String,
    Email_Address: String
},
{
    collection: "business_contact"
});

module.exports = mongoose.model('Contact', contactModel);