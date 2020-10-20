let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require ('passport');

let contactController = require('../controllers/contact_list');

//helper function for guar purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
// Get Route for the Contact List page - Read Operation
router.get('/', contactController.displayContactList);

//GET Route for displaying Add page - CREATE OPERATION
router.get('/add', requireAuth, contactController.displayAddPage);

//POST Route for processing Add page - CREATE OPERATION
router.post('/add', requireAuth, contactController.processAddPage);

//GET Route for displaying Edit page - UPDATE OPERATION
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

//POST Route for processing Edit page - UPDATEE OPERATION
router.post('/edit/:id', requireAuth, contactController.processEditPage);

//GET to preform Delection - DELETE OPERATION
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;