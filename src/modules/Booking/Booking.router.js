import { Router } from "express";
import * as BookingCokntroller from "./controller/Booking.js"
import auth from "../../middleware/auth.js";
import endpoint from "./booking.endpoint.js";
const router= Router()

router.post("/",auth(endpoint.Add),BookingCokntroller.BookingRoom)
router.put("/:id",auth(endpoint.Add),BookingCokntroller.CancelBooking)
router.put("/Update/:bookingId",auth(endpoint.Add),BookingCokntroller.UpdateBookingRoom)








export default router