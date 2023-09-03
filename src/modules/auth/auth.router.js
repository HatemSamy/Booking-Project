import { Router } from "express";
 const router= Router()
 import * as authController from "./controller/registration.js"



 router.post("/signup",authController.signup)

 router.get("/confirmEmail/:token" ,authController.confirmEmail)

 router.get("/login",authController.login)







 export default router