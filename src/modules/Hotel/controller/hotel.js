import HotelModel from "../../../../DB/model/Hotel.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";
import cloudinary from "../../../services/cloudinary.js";
import RoomModel from "../../../../DB/model/Room.model.js";

// import { Promise } from "mongoose";

export const CreateHotel = asynchandlier(async (req, res, next) => {
  
  if (!req.files.length) {
    return next(Error("hotel images is required",{cause:400})) 
  } else {
    const images = []
    const name = req.body.Name
    for (const file of req.files) {
      const { secure_url } = await cloudinary.uploader.upload(file.path, { folder: `BookingProject/Hotels/${name}` })
      images.push(secure_url)
      req.body.images = images
    }
    const NewHotel = await HotelModel.create(req.body)
    if (!NewHotel) {
      return  next(new Error("fail to add Hotel"))
    } else {
      return res.status(201).json({ message: "hotel created successfuly",NewHotel})
    }
  }
})

export const Hotels = asynchandlier(async (req, res, next) => {
  
    const {min,max,...others}=req.query
    const Hotels= await HotelModel.find({

      ...others,
      cheapestPrice:{$gt:min | 1,$lt:max ||999}
    })
    if (!Hotels) {
      return  next(new Error("not found Hotel"))
    } else {
    return res.status(201).json({ message: "hotels",Hotels})
    }
  }
)

export const countCity = asynchandlier(async (req, res, next) => {
  
  const {cities}=req.query
  const list= await Promise.all(
    cities.map((city)=>{
    return HotelModel.find({city:city})
  })

  )
  return res.status(200).json({message:"count",list})

}
)

export const countHotelByType =async (req, res, next) => {
  
    const {type}=req.body

   const hotel= await HotelModel.find({type})
   return res.status(200).json({message:"count",type:{hotel}})
  
   }


   export const getHotelRooms = asynchandlier(async (req, res, next) => {
    const {id}=req.params
    const hotel = await HotelModel.findById(id)
      if (!hotel) {
        next(new Error("not found hotel"))
      } else {
        
          const hotel = await HotelModel.findById(id).populate('Rooms');
      
          if (!hotel) {
            return next(new Error("Hotel not found"));
          }
      
          const roomList = hotel.Rooms;
      
          return res.status(200).json({ message: "Room list", roomList });
          
      }
       
      }
      
        
  )


  export const DeleteHotel =asynchandlier( async (req, res, next) => {
    const { id } = req.params;
   
      const hotel = await HotelModel.findById(id);
      if (!hotel) {
        return next(new Error("Hotel not found"));
      }
  
     const deleted= await hotel.deleteOne({_id:id}); // Delete the hotel
  if (!deleted) {
    next(new Error("delete one fail"))
  } else {
    return res.status(200).json({ message: "Hotel has been deleted and its rooms using hooks" });
  } 
  
   
  // })


  // export const DeleteHotel = async (req, res, next) => {
  //   const { id } = req.params;
  //   const findHotel = await HotelModel.findById(id);
  
  //   if (!findHotel) {
  //     return next(new Error("Hotel not found"));
  //   }
  
  //   const deleteResult = await HotelModel.deleteOne({ _id: id },{new:false});
  //     console.log(deleteResult);
    
  
  //   // Hotel deleted successfully, continue with other operations
  
  //   res.status(200).json({ message: "Hotel has been deleted" ,deleteResult});
  // };
  






  






      
        
    //  export const DeleteHotel = asynchandlier(async (req, res, next) => {
    // const {id}=req.params
    // const Findhotel = await HotelModel.findById(id)
    //   if (!Findhotel) {
    //     next(new Error("not found hotel"))
    //   } else {
        
    //       const hotel = await HotelModel.deleteOne({_id:id})
    //       if (hotel.deletedCount === 0) {
    //         return next(new Error("Hotel not found"));
    //       }
      
    //       if (!hotel) {
    //         return next(new Error("Hotel not found"));
    //       }
      
    //       res.status(200).json({ message: " hotel has been deleted and it room using Hooks",  });
       
    //   }
       
    // /

})