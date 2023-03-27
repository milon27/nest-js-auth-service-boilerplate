import { Controller, Post, Req, Res, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { LocalAuthGuard } from "../auth/guard/local.guard"
import { ACCESS_TOKEN } from "../auth/guard/protected.guard"

@Controller("login")
export class LoginController {
    @UseGuards(LocalAuthGuard)
    @Post()
    login(@Req() req: Request, @Res() res: Response) {
        // set cookie
        res.cookie(ACCESS_TOKEN, req.user[ACCESS_TOKEN])
        return { ...req.user, ACCESS_TOKEN: req.user[ACCESS_TOKEN] }
    }
}
