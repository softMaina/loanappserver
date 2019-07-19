var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var profile = new Schema({
    userid:    { type:String, isRequired:true },
    fullname:  { type:String, default:'' },
    image:     { type:String, default:'' },
    contact:   { type:String, default:'' },
    email:     { type:String,default:'' },
});

module.exports = mongoose.model('profile',loanSchema);

