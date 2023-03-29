import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express"
import Constant from "../../../utils/constant/constant"
import { AuthService } from "../auth.service"

@Injectable()
export class ProtectedGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest() as Request
            const token = req.headers?.authorization?.split(" ")[1] || req.cookies[Constant.COOKIE_KEY]
            const payload = this.authService.verifyJwtToken(token)
            req.user = payload
            return true
        } catch (error) {
            console.log("ProtectedGuard Error : ", error.message)
            return false
        }
    }
}
