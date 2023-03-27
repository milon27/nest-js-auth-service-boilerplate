import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "../user/user.service"
import { IJwtUser } from "./interface/jwt-user.interface"

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(identifier: string, password: string): Promise<IJwtUser | undefined> {
        const user = await this.userService.getUserByIdentifier(identifier)
        // todo: check password with bcrypt
        if (!password) {
            return undefined
        }
        if (user) {
            return {
                id: user.id,
                role: user.role,
            } as IJwtUser
        }
        return undefined
    }

    generateJwtToken(payload: IJwtUser) {
        return this.jwtService.sign(payload)
    }

    verifyJwtToken(token: string) {
        return this.jwtService.verify<IJwtUser>(token)
    }
}
