import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express"
import { AuthService } from "../auth.service"

export const ACCESS_TOKEN = "token"

@Injectable()
export class ProtectedGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest() as Request
            const token = req.headers?.authorization?.split(" ")[1] || req.cookies[ACCESS_TOKEN]
            const payload = this.authService.verifyJwtToken(token)
            req.user = payload
            return true
        } catch (error) {
            console.log("ProtectedGuard: ", error.message)
            return false
        }
    }
}
