import { roles } from "../../middleware/auth.js";

export const endPoint = {

    update: [roles.user],

    get: [roles.user],

    delete: [roles.Admin]


}