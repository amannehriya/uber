const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blackListSchema = new schema({
    token:{
        type:String,
        required:true
    }
},{timestamps:true});

blackListSchema.index({token:1},{unique:true});
module.exports = mongoose.model("blackList",blackListSchema);
