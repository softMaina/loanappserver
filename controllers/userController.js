var mongoose = require('mongoose');
var user = mongoose.model('User');

const jwt = require('jsonwebtoken');
const secret = '123456789';

class userController{

    /**
     * get all the users
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    index(req,res,next){
        user.find({},function(err, users){
            if(err)
                res.json(err)
            
            res.json(users)

        })
    }

    login(req, res, next){
        const { email, password } = req.body;
        user.findOne({email}, function(err, user){
            if(err){
                return res.status(500)
                    .json({
                        error:'Internal error please try again'
                    });
            }else if(!user){
                return res.status(401)
                .json({
                    error:'Incorrect email or password'
                });

            }else{
                user.isCorrectPassword(password, function(err, same){
                    if(err){
                        return res.status(500)
                            .json({
                                error: 'Internal error please try again'
                            });
                    }else{
                        //issue token
                        const payload = {email};
                        const token = jwt.sign(payload, secret,{
                            expiresIn: '1h'
                        });
                        // res.cookie('token',token, {httpOnly:true})
                        //     .sendStatus(200)
                        return res.json({
                            token:token,
                            user:user,
                        });
                    }
                });
            }
        });
     
    }

    register(req, res, next){
        const { email } = req.body.email;
        var userRegister = new user(req.body);
        userRegister.save(function(err, user){
            if(err)
                return res.json(err);
            const payload ={email};
            const token = jwt.sign(payload,secret,{
                expiresIn:'1h'
            })
            return res.json({
                user:user,
                token:token
            });
        });
    }

    logout(req, res, next){
    
    }
}

var users = new  userController()
module.exports = users;

