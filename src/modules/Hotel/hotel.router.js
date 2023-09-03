import { Router } from "express";
const router= Router()
 import *  as hotelController from  "./controller/hotel.js"
 import auth from "../../middleware/auth.js"
import endPoint from "./hotel.endPoint.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import roomRouter from "../Rooms/room.router.js"

router.use('/:hotelId/room',roomRouter)
router.post("/",auth(endPoint.add),myMulter(fileValidation.image).array("images",3),hotelController.CreateHotel)
router.get("/",hotelController.Hotels)
router.get("/count",hotelController.countCity)
router.get("/ByType",hotelController.countHotelByType)
router.get("/:id",hotelController.getHotelRooms)
router.delete("/:id",hotelController.DeleteHotel)






export default router