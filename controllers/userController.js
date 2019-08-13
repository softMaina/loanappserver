  
var mongoose = require('mongoose');
var user = mongoose.model('User');
var loan = mongoose.model('Loan');
var guarantor = mongoose.model('Guarantors');
var mail = require('../config/mail');

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
        user.find({role:'member'},function(err, users){
            if(err)
                res.json(err)
            
            res.json(users)

        })
    }


    staff(req, res,next){
        user.find({role:'staff'},function(err,users){
            if(err)
                res.json(err)
            res.json(users)
        })
    }

    login(req, res, next){
        const { email, password } = req.body;

        user.findOne({email}, function(err, userdata){
            if(err){
                return res.json({
                        error:err
                    });
            }else if(!userdata){
                return res.status(401)
                .json({
                    error:'Incorrect email or password'
                });

            }else{
                userdata.isCorrectPassword(password, function(err, same){
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
                            user:userdata,
                        });
                    }
                });
            }
        });
     
    }

    register(req, res, next){
        // validation
        if(req.body === null || req.body === ''){
            return res.json({
                error:'Missing fields in request body'
            })
        }
        if(req.body.firstname !== '' && req.body.lastname !== ''){
            //create password value
            var password = Math.floor(Math.random() * 10000)

            var data = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                contact:req.body.contact,
                password:password,
                role:req.body.role
            }
            console.log(data)


            var userRegister = new user(data)
            userRegister.save(function(err, user){
                if(err){
                    console.log(err)
                    return res.json({
                        error: err
                    })
                }
                try {
                    mail(data.email,data.password);
                } catch (error) {
                    console.log(error)
                }
                return res.json({
                    success:'User registered successfully',
                    user:{ password: password, email: req.body.email }
                })
            })
        }
    }

    approveUser(req, res, next){
        var filter = {_id:req.params.id};
        var update = {approved: true};
        user.findOneAndUpdate(filter,update,{new:true},function(err,response){
            if(err)
                return res.json(err)
            return res.json(response)
        })
    }

    userReport(req, res, next){
       var userdata =  user.find({_id:req.params.id}).then((err)=>{
            if(err)
                return res.json(err);
        });
        var guarantordata = guarantor.find({userid:req.params.id}).then((err)=>{
            if(err)
                return res.json(err);
        })
        var loandata = loan.find({userid:req.params.id}).then((err)=>{
            if(err)
                return res.json(err);
        })

        var data = {
            _user: userdata,
            _guarantors: guarantordata,
            _loans: loandata
        }

        return res.json(data);
    }
}

var users = new  userController()
module.exports = users;

