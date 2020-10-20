let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects Page. */
router.get('/project', indexController.displayProjectPage);

/* GET Services page. */
router.get('/services', indexController.displayServicePage);

//GET Route for displaying Login page 
router.get('/login', indexController.displayLoginPage);

//POST Route for processing Login page
router.post('/login', indexController.processLoginPage);

//GET Route for displaying Register page 
router.get('/register', indexController.displayRegisterPage);

//POST Route for processing Register page
router.post('/register', indexController.processRegisterPage);

//GET to preform UserLogout
router.get('/logout', indexController.performLogout);
module.exports = router;
