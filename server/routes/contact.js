//Hyunjune Shin 301099013 2020-10-20
//Routing for the contact page

let express = require('express');
let router = express.Router();

let contactController = require('../controllers/contact');
/* GET users listing. */
router.get('/',contactController.displayContactPage );

module.exports = router;