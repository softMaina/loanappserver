var mongoose = require('mongoose');
var loan = mongoose.model('Loan');

class LoanController{

    /**
     * get all loans
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req, res, next){
        loan.aggregate([{
        $lookup:{
            from:"users",
            localField:"userid",
            foreignField:"_id",
            as:"users"
        }
        },
     
        {
            $lookup:{
                from:"loanrequests",
                localField:"requestid",
                foreignField:"_id",
                as:"requests"
            }
        },
        
        ]).then((err, response)=>{
            if(err)
                res.json(err)
            res.json(response)
        })
       
    }

    /**
     * get user loans details by userid
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    show(req,res,next){
        var data = new loan(req.body);
        
        data.findById(req.body.id,function(err, loanData){
            if(err)
                res.send(err);
            
            res.json(loanData)
        })
    }

    async store(data){

       if(data.status === 'accepted'){
            var info = {
                "userid":data.userid,
                "requestid":data._id,
                "amount":data.amount,
            }
            var loanObj = new loan(info);
          
            await loanObj.save(function(err, info){
                if(err)
                    return err;
                return info;
                
            })
        }
    }
}

const loanController = new LoanController();

module.exports = loanController;
