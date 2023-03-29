import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { IStrategyOptions, Strategy } from "passport-local"
import { AuthService } from "../auth.service"
import { IJwtUser } from "../interface/jwt-user.interface"

export const LocalStrategyName = "LOCAL"

/**
 * @return {IJwtUser} user
 */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LocalStrategyName) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "identifier",
            passwordField: "password",
        } as IStrategyOptions)
    }

    async validate(identifier: string, password: string): Promise<IJwtUser> {
        const user = await this.authService.validateUser(identifier, password)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
