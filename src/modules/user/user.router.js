import { Router } from "express";
import * as userController from "./controller/user.js"
import auth from "../../middleware/auth.js"
import { endPoint } from "./user.endPoint.js";
const router = Router()




router.put('/',auth(endPoint.update),userController.updateUser)
router.delete('/:id',auth(endPoint.delete),userController.deleteUser)
router.get('/',auth(endPoint.get),userController.getUsers)




export default router