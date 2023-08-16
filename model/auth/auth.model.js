const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name : {type:String, required :[true, "Please provide your name"]},
    email: {type:String , required: [true, "Please provide your age"],unique:true},
    password: {type:String, required: [true, "Please provide your password"]},
}, 
{
    versionKey: false,
    timestamps: true
}
);

const Auth = mongoose.model("auth" , authSchema);

module.exports = Auth;