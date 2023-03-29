import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { ProtectedGuard } from "../auth/guard/protected.guard"
import { UserService } from "./user.service"

@UseGuards(ProtectedGuard)
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    loggedInUser(@Req() req: Request) {
        return this.userService.getloggedInUser(req.user.id)
    }

    // todo: update a user (update profile pic/avater, password, email, active status, etc)
    // todo: add
}
