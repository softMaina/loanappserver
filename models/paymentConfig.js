var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var paymentConfig = new Schema({
    userid:        { type:String, isRequired:true },
    rate:    {type:Number},
    duration:{type:Number},
    interval:{type:Number}, 
});

module.exports = mongoose.model('paymentConfig',loanSchema);

