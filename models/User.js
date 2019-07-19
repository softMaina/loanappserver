var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const saltRounds = 10;

var userSchema = mongoose.Schema({
    username: { type:String, required: true, unique:true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    createdAt: {type:Date, default: Date.now },
    isAdmin:{type:String, default:false}
});

userSchema.pre('save',function(next){
    //check if the document is new or the password has been reset
    if(this.isNew || this.isModified('password')){
        //changing reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password,saltRounds,
            function(err, hashedPassword){
                if(err){
                    next(err);
                }
                else{
                    document.password = hashedPassword;
                    next();
                }
            });

    }else{
        next();
    }
})

userSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err,same){
        if(err)
            callback(err);

        callback(err, same);
    });
}

var User = mongoose.model("User", userSchema);

module.exports = User;

