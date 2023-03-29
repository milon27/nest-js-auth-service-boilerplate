import { Body, Controller, Post, Res } from "@nestjs/common"
import { Response } from "express"
import { AuthService } from "../auth/auth.service"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { UserService } from "../user/user.service"

@Controller("register")
export class RegisterController {
    // constructor(@Inject(Constant.RABBIT_MQ_TEST1_QUEUE) private testMs: ClientProxy) {}
    // @Post()
    // async registerUser() {
    //     this.testMs.emit("any_pattern", { message: "user registerd, send him a welcome email" })
    //     return { success: true }
    // }
    constructor(private userService: UserService, private authService: AuthService) {}

    @Post()
    async registerUser(@Body() body: CreateUserDto, @Res() res: Response) {
        const user = await this.userService.createUser(body)

        return this.authService.setCookieAndSendResponse(
            {
                id: user.id,
                role: user.role,
            },
            res
        )
    }
}
