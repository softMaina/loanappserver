var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var guarantorSchema = mongoose.Schema({
    userid:    { type:ObjectId, isRequired:true },
    fullname:  { type:String, isRequired:true },
    email:     { type:String, isRequired:true },
    contact:   { type:String, isRequired:true },
});

var Guarantors = mongoose.model("Guarantors",guarantorSchema);

module.exports = Guarantors;