import { Router } from "express";
import * as RoomController from "./controller/room.js"
import auth from "../../middleware/auth.js"
import endpoint from "./room.endPoint.js"
import { fileValidation, myMulter } from "../../services/multer.js";
const router = Router({mergeParams:true})

router.put('/hotelId:/:roomId',auth(endpoint.Add),RoomController.RoomAvailability)
router.delete('/:roomId',auth(endpoint.Add),RoomController.DeleteRoom)

router.post('/',auth(endpoint.Add),myMulter(fileValidation.image).array("image"),RoomController.CreateRoom)
router.put('/update/:roomId',auth(endpoint.Add),myMulter(fileValidation.image).array("image"),RoomController.UpdateRoom)

export default router