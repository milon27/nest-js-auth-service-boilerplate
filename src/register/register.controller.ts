import { Controller, Inject, Post } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import Constant from "../utils/constant/constant"

@Controller("register")
export class RegisterController {
    // constructor(@Inject(Constant.RABBIT_MQ_TEST1_QUEUE) private testMs: ClientProxy) {}
    // @Post()
    // async registerUser() {
    //     this.testMs.emit("any_pattern", { message: "user registerd, send him a welcome email" })
    //     return { success: true }
    // }
}
