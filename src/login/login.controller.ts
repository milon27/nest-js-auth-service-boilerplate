import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { GoogleAuthGuard } from "../auth/guard/google.guard"
import { LocalAuthGuard } from "../auth/guard/local.guard"
import { ACCESS_TOKEN } from "../auth/guard/protected.guard"

@Controller("login")
export class LoginController {
    @UseGuards(LocalAuthGuard)
    @Post("local")
    login(@Req() req: Request, @Res() res: Response) {
        // set cookie
        res.cookie(ACCESS_TOKEN, req.user[ACCESS_TOKEN])
        res.send({ ...req.user, [ACCESS_TOKEN]: req.user[ACCESS_TOKEN] })
    }

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // it will show the popup for select google account then redirect to google-redirect route
    }

    @Get("google-redirect")
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        // set cookie
        res.cookie(ACCESS_TOKEN, req.user[ACCESS_TOKEN])
        // res.send({ ...req.user, [ACCESS_TOKEN]: req.user[ACCESS_TOKEN] })
        res.redirect("/api/auth/user") // any frontend url maybe dashboard or profile screen, for now just redirecting to a backend protected route
    }
}
