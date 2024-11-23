import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        minlength:3,
        maxlength:25
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    userAvailablecredits:{
        type:Number,
        default:3
    }
})

const userModel = mongoose.model('User', userSchema)
export default userModel