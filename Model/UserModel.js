const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User' },

})

const User=mongoose.model("user",userSchema)
module.exports=User;