var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var loanRequest = mongoose.Schema({
    userid: { type: ObjectId, isRequired:true },
    date:   { type:Date, default: Date.now, isRequired:true },
    amount: { type: Number },
    type:   { type: String },
    size:   { type: String },
    cost:   {type: Number },
    use :   {type: String },
    status: { type:String, default:'pending' }
});

var loanRequest = mongoose.model("loanRequest", loanRequest);

module.exports = loanRequest;