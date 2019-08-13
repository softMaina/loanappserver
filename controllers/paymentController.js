var mongoose = require('mongoose');
var loan = mongoose.model('payment');
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
     * simulate cash to the user
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    admin_simulate(req, res, next){
        var data = {
            userid:req.body.user_id,
            amount:req.body.amount,
            type:"loan"
        }
        var loan_grant = new payment(data);
        loan_grant.save(req.body, function(err, response){
            if(err)
                return res.json(err)

            return res.json(response);
        })
    }

    user_simulate(req, res, next){
        payment.save(req.body,function(err, response){
            if(err)
                return res.json(err)
            return res.json(response);
        })
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
var payments = new paymentController();
module.exports = payments;