import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { Response } from "express"
import Constant from "../../utils/constant/constant"
import { UserService } from "../user/user.service"
import { IJwtUser, IJwtUserWithToken } from "./interface/jwt-user.interface"

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(identifier: string, password: string): Promise<IJwtUser | undefined> {
        const user = await this.userService.getUserByIdentifier(identifier)

        if (user) {
            const ckPass = await bcrypt.compare(password, user.password)
            if (ckPass) {
                return {
                    id: user.id,
                    role: user.role,
                } as IJwtUser
            }
        }
        return undefined
    }

    async validateUserForSocail(name: string, identifier: string): Promise<IJwtUser | undefined> {
        let user = await this.userService.getUserByIdentifier(identifier)
        if (!user) {
            // create new user using this info if user not exist
            user = await this.userService.createUser({
                name,
                email: identifier,
                password: Constant.DEFAULT_PASSWORD,
            })
        }

        return {
            id: user.id,
            role: user.role,
        } as IJwtUser
    }

    setCookieAndSendResponse(user: IJwtUser, res: Response) {
        // set cookie
        const accessToken = this.generateJwtToken(user)
        // set cookie
        res.cookie(Constant.COOKIE_KEY, accessToken)
        return res.send({
            id: user.id,
            role: user.role,
            accessToken,
        } as IJwtUserWithToken)
    }

    setCookieAndSendResponseForSocial(user: IJwtUser, res: Response) {
        // set cookie
        const accessToken = this.generateJwtToken(user)
        // set cookie
        res.cookie(Constant.COOKIE_KEY, accessToken)
        // todo: redirect url need to be checked.
        res.redirect("/api/auth/user") // any frontend url maybe dashboard or profile screen, for now just redirecting to a backend protected route
    }

    generateJwtToken(payload: IJwtUser) {
        return this.jwtService.sign(payload)
    }

    verifyJwtToken(token: string) {
        return this.jwtService.verify<IJwtUser>(token)
    }
}
