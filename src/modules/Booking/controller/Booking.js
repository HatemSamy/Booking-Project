import BookingModel from "../../../../DB/model/Boocking.model.js"
import RoomModel from "../../../../DB/model/Room.model.js"
import { asynchandlier } from "../../../services/erroeHandling.js"




export const BookingRoom = asynchandlier(async (req, res, next) => {

    const { checkIn, checkOut, roomId, daysNumber } = req.body
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    console.log(startDate, endDate);
    if (startDate >= endDate) {
        return res.status(400).json({ message: "invalid Date endDate must be befor start date" })

    }


    const existingBookingOverlap = await BookingModel.findOne({
        roomId,
        $or: [
            // New check-in date is between existing booking's check-in and check-out dates
            { checkIn: { $lt: checkIn }, checkOut: { $gt: checkIn } },
            // New check-out date is between existing booking's check-in and check-out dates
            { checkIn: { $lt: checkOut }, checkOut: { $gt: checkOut } },
            // Existing booking is completely within the new booking's check-in and check-out dates
            { checkIn: { $gte: checkIn }, checkOut: { $lte: checkOut } },
        ],
    });

    if (existingBookingOverlap) {
        return res.status(400).json({ message: "Room is not available for the selected date." });
    }


    const booking = await BookingModel.create({ checkIn, checkOut, roomId, userId: req.user._id, daysNumber })

    return res.status(201).json({ message: 'Booking created successfully', booking });

})


//Cancel booking using soft delete
export const CancelBooking = asynchandlier(async (req, res, next) => {

    const { bookingId } = req.params

    const booking = await BookingModel.findOneAndUpdate({ userId: req.user._id, bookingId }, { Cancel: true }, { new: true })
    if (!booking) {
        return res.status(404).json({ massege: "booking not found or somthing wrong" })
    } else {
        return res.status(201).json({ massege: "booking Deleted successfly", booking })

    }

})


export const UpdateBookingRoom = asynchandlier(async (req, res, next) => {
    const { bookingId } = req.params
    const BookingFound = await BookingModel.findOne({ bookingId, userId: req.user._id })
    if (!BookingFound) {
        return res.status(400).json({ message: "Not found booking" })

    }
    const { checkIn, checkOut, daysNumber } = req.body
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    console.log(startDate, endDate);

    if (startDate >= endDate) {
        return res.status(400).json({ message: "invalid Date endDate must be befor start date" })

    }


    const existingBookingOverlap = await BookingModel.findOne({
        roomId: BookingFound.roomId,
        _id: { $ne: bookingId },
        $or: [
            // New check-in date is between existing booking's check-in and check-out dates
            { checkIn: { $lt: checkIn }, checkOut: { $gt: checkIn } },
            // New check-out date is between existing booking's check-in and check-out dates
            { checkIn: { $lt: checkOut }, checkOut: { $gt: checkOut } },
            // Existing booking is completely within the new booking's check-in and check-out dates
            { checkIn: { $gte: checkIn }, checkOut: { $lte: checkOut } },
        ],
    },);

    if (existingBookingOverlap) {
        return res.status(400).json({ message: "Room is not available for the selected date." });
    } else {
        const update = await BookingModel.findOneAndUpdate(
            bookingId
            , { checkOut: endDate, checkIn: startDate, daysNumber }, { new: true })
        return res.status(201).json({ message: 'Booking Updated successfully', update });

    }
})



