var mongoose = require("mongoose");

var paymentSchema = mongoose.Schema({
    userId: { type:String },
    date  : { type:Date, default:Date.now },
    amount: { type:Number }
});

var Payment = mongoose.model("Payment",paymentSchema);


module.exports = Payment;