var mongoose = require('mongoose');
var payment = mongoose.model('Payment');
class paymentController{
    /**
     * show all payments made and their users
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next){
        payment.find({}).then((err,response)=>{
            if(err)
                res.json(err)
            res.json(response)
        })
    }
    
    /**
     * get single payment data
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    show(req, res, next){

    }

    /**
     * add a payment to the database
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    store(req, res, next){
        paid = new payment(req.body);
        paid.save(function(err, payment){
            if(err)
                res.json(err)
            res.json(payment)
        });
    }
    update(req,res,next){
        
    }
}

module.exports = paymentController;