
import HotelModel from "../../../../DB/model/Hotel.model.js";
import RoomModel from "../../../../DB/model/Room.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asynchandlier } from "../../../services/erroeHandling.js";



export const CreateRoom = asynchandlier(async (req, res, next) => {
    const { hotelId } = req.params
   
    if (!req.files) {
        next(new Error("image is required"))
    } else {
        const hotel = await HotelModel.findById(hotelId)  
        if (!hotel) {
            return next(new Error("horel not found"))
        } else {
            req.body.hotelId = hotelId
            for (const file of req.files) {
                const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,{ folder: `BookingProject/Room/${hotelId}`} )
                req.body.image=secure_url
                req.body.imagePublicId=public_id
            }
            
            const NewRoom = new RoomModel(req.body)
            const savedRoom = await NewRoom.save()
    
            const RoomHotel = await HotelModel.findByIdAndUpdate(hotelId, {
    
                $push: { Rooms: savedRoom._id}
            })
    
            return  res.status(201).json({ message: "room added", savedRoom })
        }
       

        
      
    }
    
})


export const RoomAvailability= asynchandlier(async (req, res,next) => {
    const { hotelId,room_id } = req.params;
   
  
   
      const room = await RoomModel.findOne(room_id,hotelId);
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
     

      const RoomAvailability= await RoomModel.findOneAndUpdate(room_id,hotelId,{available:req.body.Availability})
    
      
       
        return res.status(200).json({ message: 'Room availability updated',RoomAvailability });  
   
  }
  )


  export const DeleteRoom= asynchandlier(async (req,res,next) => {
    const { hotelId,roomId } = req.params;
      const room = await RoomModel.findOneAndDelete({ _id: roomId, hotelId },{new:false});
      console.log(room);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }else{
        if (room.imagePublicId) {
          await cloudinary.uploader.destroy(room.imagePublicId);
        }
      
        return res.status(404).json({ error: `Room wirh Id:${roomId} Has been deleted `});
         

      }
  
    
      
     })

     export const UpdateRoom= asynchandlier(async (req,res,next) => {
      const { hotelId,roomId } = req.params;
        const room = await RoomModel.findOne({ _id: roomId, hotelId });
        if (!room) {
          return res.status(404).json({ error: 'Room not found' });
        }
        if (req.files) {
            for (const file of req.files) {
              const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,{ folder: `BookingProject/Room/${hotelId}`} )
              req.body.image=secure_url
              req.body.imagePublicId=public_id
          }

          const UpdateRoom= await RoomModel.findOneAndUpdate({ _id: roomId, hotelId},{$set:req.body})
          
          if (UpdateRoom) {
            await cloudinary.uploader.destroy(room.imagePublicId);
          }
        
          return res.status(404).json({ Message: `Room wirh Id:${roomId} Has been Updated`,UpdateRoom});
           
  
        }
    
       })











