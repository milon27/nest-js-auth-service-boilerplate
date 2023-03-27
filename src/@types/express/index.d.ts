// import { IJwtRole } from '../../models/User'

declare namespace Express {
    type IJwtUser = import("../../auth/interface/jwt-user.interface").IJwtUser

    export interface Request {
        user: IJwtUser
        agent: "android" | "browser" | "postman"
        isHttps: boolean
    }
}
