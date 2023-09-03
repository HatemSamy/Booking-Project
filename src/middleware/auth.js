import jwt from 'jsonwebtoken'
import  userModel  from '../../DB/model/user.model.js';




export const roles={

    user:"user",
    Admin:"Admin",
    superAdmin:"superAdmin"
}
export const auth = (accessRole) => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers
            console.log({ authorization });
            if (!authorization?.startsWith(process.env.BearerKey)) {
                res.status(400).json({ message: "In-valid Bearer key" })
            } else {
                const token = authorization.split(process.env.BearerKey)[1]
                const decoded = jwt.verify(token,process.env.tokenSignature)
                if (!decoded?.id || !decoded?.isLoggedIn) {
                    res.status(400).json({ message: "In-valid token payload " })
                } else {
                    const user = await userModel.findById(decoded.id).select('email userName role')
                    if (!user) {
                        res.status(404).json({ message: "Not register user" })
                    } else {
                        if (!accessRole.includes(user.role)) {
                            res.status(404).json({ message: "Not authrized user" })
                              
                        }else{
                             req.user = user
                            next()
                        }
                    
                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: "catch error", error })

        }


    }
}
export default auth