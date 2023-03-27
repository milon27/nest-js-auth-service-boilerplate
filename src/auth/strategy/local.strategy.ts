import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { IStrategyOptions, Strategy } from "passport-local"
import { AuthService } from "../auth.service"

export const LocalStrategyName = "LOCAL"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LocalStrategyName) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "identifier",
            passwordField: "password",
        } as IStrategyOptions)
    }

    async validate(identifier: string, password: string) {
        const user = await this.authService.validateUser(identifier, password)
        if (!user) {
            throw new UnauthorizedException()
        }
        return {
            ...user,
            token: this.authService.generateJwtToken(),
        }
    }
}
