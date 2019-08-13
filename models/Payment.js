var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var paymentSchema = mongoose.Schema({
    userid: { type:ObjectId },
    date  : { type:Date, default:Date.now },
    amount: { type:Number },
    type: {type:String, default:"repayment"}
});

module.exports = mongoose.model("payment",paymentSchema);
