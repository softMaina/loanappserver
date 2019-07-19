var express = require('express');
var loanController = require('../controllers/loanController');
var guarantorsController = require('../controllers/guarantorsController');
var userController = require('../controllers/userController');
var loanRequestController = require('../controllers/loanRequestController');
const router = express.Router();

//loanrequests
router.get('/api/v1/applications',loanRequestController.index);
router.get('/api/v1/loan/user/:id',loanRequestController.show);
router.post('/api/v1/apply',loanRequestController.store);
router.put('/api/v1/application/update/:id',loanRequestController.update);
router.delete('/api/v1/application/delete/:id',loanRequestController.delete);

// loan routes
router.get('/api/v1/loans', loanController.index);
router.get('/api/v1/loans/show/:id',loanController.show);
router.patch('/api/v1/loans/approve',loanController.store)


//guarantor routes
router.get('/api/v1/guarantors',guarantorsController.index);
router.get('/api/v1/guarantors/show/:id',guarantorsController.show);
router.post('/api/v1/addguarantor',guarantorsController.store);


//user routes
router.get('/api/v1/users',userController.index);
router.post('/api/v1/register',userController.register);
router.post('/api/v1/login',userController.login);


module.exports = router;