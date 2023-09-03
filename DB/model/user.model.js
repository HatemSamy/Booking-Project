import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new Schema({

  userName: {
        type: String,
        required: [true, 'storeName is required'],
        min: [3, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'email is required'],
    },
    role: {
        type: String,
        enum:["user","Admin","superAdmin"],
        default:"user"
    },
    image: {
        type:String,
        
    },
    city: {
        type:String,
    },
    country: {
        type:String,
    },
    phone: {
        type:String,
        required: [true, 'phone required'],
    },
    password: {
        type:String,
        required: [true, 'password required'],
    },
   
    confirmEmail:{
     type:Boolean,
     default:false
    }

    
}, {
    timestamps: true
})
userSchema.pre("save", function (next) {

    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
    next()

})
const userModel = model('User', userSchema)
export default userModel