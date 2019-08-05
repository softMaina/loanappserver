var mongoose = require("mongoose")

var landSchema = mongoose.Schema({
    size: {type:Number, required:true},
    cost: {type:Number, required:true},
    image: {type:String},
    location: {type:String, required:true},
    description: {type:String, required:true},
    sold: {type:Boolean, default:false}
})


module.exports = mongoose.model("Land",landSchema)