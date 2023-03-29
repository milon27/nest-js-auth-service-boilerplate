import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { AuthService } from "../auth/auth.service"
import { GoogleAuthGuard } from "../auth/guard/google.guard"
import { LocalAuthGuard } from "../auth/guard/local.guard"

@Controller("login")
export class LoginController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("local")
    login(@Req() req: Request, @Res() res: Response) {
        return this.authService.setCookieAndSendResponse(req.user, res)
    }

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // it will show the popup for select google account then redirect to google-redirect route
    }

    @Get("google-redirect")
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        return this.authService.setCookieAndSendResponseForSocial(req.user, res)
    }
}
