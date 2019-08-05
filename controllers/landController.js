'use strict'

var Land = require('../models/Land');
var multerConfig = require('../config/multer');

class LandController{
    // get all lands, sold and for sale
    index(req, res, next){
        Land.find({}).then((response)=>{
            return res.json(response)
        })

    }
    //get lands for sale
    index_for_sale(req, res, next){
        Land.find({sold:false}).then((error, response)=>{
            if(error)
                return res.json(error)
            return res.json(response)
        })
    }

    //store land to database
    store(req, res, next){
        var requestobj = JSON.parse(req.body.body)
        var data = {
            title:requestobj.title,
            description: requestobj.title,
            location:requestobj.location,
            image:req.file.filename,
            size:requestobj.size,
            cost:requestobj.cost
        }
        var land = new Land(data)
        land.save(function(err,response){
            if(err)
                return res.json(err)
            return res.json(response)
        })
        
    }

    //update land 
    update(req, res, next){
        var filter = {_id:req.params.id };
        var update = {sold:req.body.sold};
        console.log(filter, update)
        Land.findOneAndUpdate(filter, update,{new:true},function(err, response){
            if(err)
                return res.json(err)
            return res.json(response)
        });
    }

    //delete land
    delete(req, res, next){
        Land.remove({_id:req.params.id},function(err, task){
            if(err)
                return res.json(err)
            return res.json(task)
        })
    }
}

const landController = new LandController();

module.exports = landController;