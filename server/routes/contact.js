let express = require('express');
let router = express.Router();

let contactController = require('../controllers/contact');
/* GET users listing. */
router.get('/',contactController.displayContactPage );

module.exports = router;