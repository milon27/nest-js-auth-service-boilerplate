import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20"
import { AuthService } from "../auth.service"

/**
 * @return {IJwtUser} user
 */

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private authService: AuthService) {
        super({
            clientID: config.get("G_CLIENT_ID"),
            clientSecret: config.get("G_SECRET_ID"),
            callbackURL: config.get("G_REDIRECT_URL"), // this need to be added in google console
            scope: ["email", "profile"],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        console.log({ accessToken, refreshToken, profile })
        const { name, emails } = profile
        if (accessToken) {
            const user = await this.authService.validateUserForSocail(
                `${name.givenName} ${name.familyName}`,
                emails[0].value
            )

            done(null, user)
        } else {
            done(new UnauthorizedException("google login failed!"))
        }
    }
}

//  ref: https://dev.to/chukwutosin_/implement-google-oauth-in-nestjs-using-passport-1j3k
