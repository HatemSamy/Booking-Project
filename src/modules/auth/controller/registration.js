import userModel from "../../../../DB/model/user.model.js"
import { asynchandlier } from "../../../services/erroeHandling.js"
import sendEmail from "../../../services/email.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = asynchandlier(async (req, res, next) => {
    const { email, password, userName, phone } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
     return   res.status(401).json({ message: "user aready exist" })


    } else {

        const newuser = new userModel({ email, password, userName, phone })

        const token = jwt.sign({ id: newuser._id }, process.env.emailToken, { expiresIn: "6h" })
        const refreshtoken = jwt.sign({ id: newuser._id }, process.env.emailToken, { expiresIn: "6h" })

        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
        const link2 = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshtoken/${refreshtoken}`

        const messege = `
        <a href='${link}'>confirmEmail<a/>
        <br><br>
        <a href='${link2}'>refreshtoken<a/>`

        const info = await sendEmail(email, "ConfirmEmail", messege)
        if (info?.accepted?.length) {
            const saveduser = await newuser.save()
            return res.status(200).json({ message: " add User successflly", email: saveduser.email, userName: saveduser.userName })

        } else {


            return next(new Error(" fail to add User", { cuase: 400 }))


        }
    }

})

export const confirmEmail = asynchandlier(async (req, res, next) => {

    const { token } = req.params
    const decoded = jwt.verify(token, process.env.emailToken)
    if (!decoded?.id) {
        return next(new (Error("in-valid token", { cause: 401 })))
    } else {
        const findUser = await userModel.findById({ _id: decoded.id })
        if (!findUser) {
            next(new (Error("not found user", { cause: 403 })))

        } else {
            if (findUser.confirmEmail) {
                return next(Error("email aready confirmed", { cause: 403 }))

            } else {
                const useractivation = await userModel.findByIdAndUpdate({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true })
              return  res.status(201).json({ massage: "email confirmed" })
            }
        }


    }

})

export const login = asynchandlier(async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {

        return  next(new Error("not found user", { cause: 404 }))

    } else {

        const match = bcrypt.compareSync(password, user.password)
        if (!match) {
            return  next(new Error(" wrong password", { cause: 400 }))

        } else {
            const token = jwt.sign({ id: user._id, isLoggedIn: true, role: user.role }, process.env.tokenSignature, { expiresIn: "6h" })
            return  res.status(201).json({ message: "welcome back", token })
        }

    }

})












