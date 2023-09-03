import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import * as indexRouter from './src/modules/index.router.js'
import connectDB from './DB/connection.js'
import { globalErrorHandling } from './src/services/erroeHandling.js'
// import { globalErrorHandling } from './src/services/erroeHandling.js'
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 5000
const baseUrl = process.env.BASEURL
//convert Buffer Data
app.use(express.json())
//Setup API Routing 
app.use(`${baseUrl}/auth`, indexRouter.authRouter)
app.use(`${baseUrl}/user`, indexRouter.userRouter)
app.use(`${baseUrl}/hotel`, indexRouter.HotelRouter)
app.use(`${baseUrl}/Booking`, indexRouter.BoockingRouter)

app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})

connectDB()
// Handling Error
app.use(globalErrorHandling)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))