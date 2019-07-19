var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var loanRequest = mongoose.Schema({
    userid: { type: ObjectId, isRequired:true },
    date:   { type:Date, default: Date.now, isRequired:true },
    amount: { type:Number, isRequired:true },
    status: { type:String, default:'pending' }
});

var loanRequest = mongoose.model("loanRequest", loanRequest);

module.exports = loanRequest;