var mongoose = require('mongoose');
var profile = mongoose.model('profile');

class profileController{

    /**
     * get all user profiles
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req,res,next){

    }

    /**
     * update a user profile
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    update(req, res, next){

    }

    store(req, res,next){
        
    }
}

module.exports = profileController;