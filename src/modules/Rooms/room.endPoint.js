
import { roles } from "../../middleware/auth.js"
export const endpoint= {
Add:[roles.user,roles.Admin]

}


export default endpoint