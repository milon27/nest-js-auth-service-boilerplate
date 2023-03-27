import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { IJwtUser } from "../interface/jwt-user.interface"

@Injectable()
export class ProtectedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const token = req.headers.authorization.split(" ")[1]
            // todo: const payload = this.jwt.getPayloadFromToken(token) as IJwtUser
            req.user = {
                id: "a",
                role: {},
            } as IJwtUser
            if (token) return true
            throw new ForbiddenException()
        } catch (error) {
            // console.log("auth.guard", error);
            return false
        }
    }
}
