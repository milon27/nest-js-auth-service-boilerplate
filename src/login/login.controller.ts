import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { LocalAuthGuard } from "src/auth/guard/local.guard"

@Controller("login")
export class LoginController {
    @UseGuards(LocalAuthGuard)
    @Post()
    login(@Req() req: Request) {
        return { ...req.user }
    }
}
