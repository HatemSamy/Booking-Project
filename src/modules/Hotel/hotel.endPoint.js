import { roles } from "../../middleware/auth.js";



const endPoint = {
    add: [roles.Admin, roles.superAdmin,roles.user],
    // update:[roles.Admin, roles.User]
}

export default  endPoint