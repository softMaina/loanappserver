var mongoose = require('mongoose');
var requests = mongoose.model('loanRequest');
var ObjectId = mongoose.Schema.Types.ObjectId;
var LoanController = require('./loanController')
var loan = mongoose.model('Loan');
class loanRequestController{
    /**
     * get all the loan requests
     * by their applicants
     * @params {*} req
     * 
     */
    index(req, res, next){
        requests.aggregate([{
            $lookup:{
                from:"users",
                localField:"userid",
                foreignField:"_id",
                as:"users"
            }
        }]).then((err, response)=>{
            if(err)
                res.json(err)
            res.json(response)
        });
    }
    /**
     * get loan applications by id
     */
    show(req, res, next){

        requests.find({_id:req.params.id},function(err,loans){
            if(err)
                res.json(err);

            console.log(req.params.id);
            res.json(loans)
        })     
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    store(req, res, next){
    
        var loanrequest = new requests(req.body);
        loanrequest.save(function(err, loan){
            if(err)
                res.send(err);
            
            res.json(loan);
        });

    }

   async update(req, res, next){
        var filter = { _id:req.params.id }
        var update = { status: req.body.status }
        
        requests.findOneAndUpdate(filter,update,{new:true},function(err, response){
            if(err){
                return res.json(err)
            }
        //         //create a loans table with the updated data
            if(response.status === 'accepted'){
                var info = {
                    "userid":response.userid,
                    "requestid":response._id,
                    "amount":response.amount,
                }
                var loanObj = new loan(info);
            
                loanObj.save(function(err, info){
                    if(err)
                        return res.json(err);
                    return res.json(info);
                    
                })
            }else{
                return res.json(response);
            }
            
        });
     

    }

    delete(req,res,next){
        // search for loan and if it had been approved,
        // dont delete
        requests.findById({_id:req.params.id}, function(err, loan){
            if(err)
                res.json
            if(loan.status === 'accepted'){
                res.json('You cannot delete a disbursed loan');
            }else{
                //delete the loan
                requests.remove({
                    _id:req.params.id
                    }, function(err, task){
                        if(err)
                            res.json(err)
                        res.json({message:'Guarantor successfully deleted'})
                    })
            }
        });
    }

}

var loanRequest =new loanRequestController()
module.exports = loanRequest;