
import { Schema, model } from "mongoose";


const RoomSchema = new Schema({

title: {
        type: String,
        required: [true, 'title is required'],
        min: [3, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    maxPeople: {
        type: Number,
        required: [true, 'maxPeople is required'],
    },
   price : {
        type: Number,
        required: [true, 'maxPeople is required'],
    },
   
        date:Date,
        state:String,
       
    image: {
        type:String,   
    },
    imagePublicId:String,
    city: {
        type:String,
    },
    desc: {
        type:String,
    }, 
    hotelId:{
        type:Schema.Types.ObjectId,
        ref:"Hotel"

    }
    ,
  available: {
    type: Boolean, 
    default: true
  
  }
}, {
    timestamps: true
})


const RoomModel = model('Room', RoomSchema)
export default RoomModel