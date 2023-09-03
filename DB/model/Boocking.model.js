
import { Schema,model} from "mongoose";
const BookingSchema= new Schema({

userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},

roomId:{
    type:Schema.Types.ObjectId,
    ref:"Room",
    required:true
},
checkIn: {
    type:Date,
    required:true,
    default:Date.now

},
 checkOut: {
    type:Date,
    required:true,
},
daysNumber: {
    type:Number,
    required:true,
},
Cancel: {
    type:Boolean,
    default:false,
},


},{timeseries:true})

const BookingModel=model("Booking",BookingSchema)
export default BookingModel