var express = require('express');
var loanController = require('../controllers/loanController');
var guarantorsController = require('../controllers/guarantorsController');
var userController = require('../controllers/userController');
var loanRequestController = require('../controllers/loanRequestController');
var paymentController = require('../controllers/paymentController');
var landController = require('../controllers/landController');
var multerConfig = require('../config/multer');
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
router.patch('/api/v1/loans/approve',loanController.store);


//guarantor routes
router.get('/api/v1/guarantors',guarantorsController.index);
router.get('/api/v1/guarantors/show/:id',guarantorsController.show);
router.post('/api/v1/addguarantor',guarantorsController.store);
router.post('/api/v1/guarantors/search',guarantorsController.searchGuarantors);


//user routes
router.get('/api/v1/users',userController.index);
router.get('/api/v1/staff',userController.staff)
router.post('/api/v1/register',userController.register);
router.post('/api/v1/login',userController.login);
router.put('/api/v1/user/update/:id',userController.approveUser);
router.put('/api/v1/user/reject/:id',userController.rejectUser);
router.get('/api/v1/users/report/:id',userController.userReport);

//land routes
router.get('/api/v1/land',landController.index);
router.get('/api/v1/land/for_sale',landController.index_for_sale);
router.post('/api/v1/land/save',multerConfig.saveToUploads,landController.store);
router.patch('/api/v1/land/update/:id',landController.update);
router.delete('/api/v1/land/delete/:id', landController.delete);

//payments
router.get('/api/v1/payments',paymentController.index);
router.post('/api/v1/payments/user_simulate',paymentController.user_simulate);
router.post('/api/v1/payments/admin_simulate',paymentController.admin_simulate);


router.post('/uploads', multerConfig.saveToUploads, (req, res) => {
    return res.json("file uploaded successfully");
});

module.exports = router;