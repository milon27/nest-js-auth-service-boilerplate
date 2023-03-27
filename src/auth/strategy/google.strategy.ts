import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20"
import { UserService } from "../../user/user.service"
import Constant from "../../utils/constant/constant"
import { AuthService } from "../auth.service"
import { ACCESS_TOKEN } from "../guard/protected.guard"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private authService: AuthService, private userService: UserService) {
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
            // create new user using this info
            let user = await this.userService.getUserByIdentifier(emails[0].value)

            if (!user) {
                user = await this.userService.createUser({
                    name: `${name.givenName} ${name.familyName}`,
                    email: emails[0].value,
                    password: Constant.DEFAULT_PASSWORD,
                })
            }
            done(null, {
                ...user,
                [ACCESS_TOKEN]: this.authService.generateJwtToken(user),
            })
        } else {
            done(new UnauthorizedException("google login failed!"))
        }
    }
}

//  ref: https://dev.to/chukwutosin_/implement-google-oauth-in-nestjs-using-passport-1j3k
