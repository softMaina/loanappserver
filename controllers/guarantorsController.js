var mongoose = require('mongoose'),
    guarantors = mongoose.model('Guarantors');

class AddGuarantor{

    /**
     * Get all the guarantors
     * @param {*} req 
     * @param {guarantors} res 
     * @param {*} next 
     */

    index(req, res, next){

        guarantors.find({}, function(err, guarantors){

            if(err)

                res.json(err)
            
            res.json(guarantors);
        })

    }

    /**
     * Show a guarantors of a user his Id
     * 
     * @param {id} req 
     * @param {*} res 
     * @param {*} next 
     */
    show(req, res, next){
        guarantors.find({userid:req.params.id}, function(err, guarantors){
            if(err)
                res.json(err)
            
            res.json(guarantors);
        })
    }

    /**
     * Add a guarantor to a user's list
     * Validate that they are not more than 7
     * @param {guarantor object} req 
     * @param {*} res 
     * @param {*} next 
     */

    store(req, res, next){
    
        var guarantor = new guarantors(req.body);
        guarantor.save(function(err, response){
            if(err)
                res.json(err)
            res.json(response);
        });
    }

    /**
     * Delete a guarantor
     * @param {id} req 
     * @param {json message} res 
     * @param {*} next 
     */

    delete(req, res, next){
        guarantors.remove({
            _id:req.params.guarantorId
        }, function(err, task){
            if(err)
                res.json(err)
            res.json({message:'Guarantor successfully deleted'})
        })
    }

    searchGuarantors(req,res){
        var searchString = req.body.search;
        guarantors.find({$text:{$search: searchString}})
                  .skip(20)
                  .limit(20)
                  .exec(function(err,docs){
                    if(err)
                        return res.json(err)
                    
                    return res.json(docs)
                  })
    }

}

var add_guarantor = new AddGuarantor();

module.exports = add_guarantor;