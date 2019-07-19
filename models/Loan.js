var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var loanSchema = new Schema({
    userid:        { type:ObjectId, isRequired:true },
    requestid:     { type:ObjectId, isRequired:true },
    date:          { type:Date, default:Date.now },
    amount:        { type:Number, isRequired:true },
});

module.exports = mongoose.model('Loan',loanSchema);

