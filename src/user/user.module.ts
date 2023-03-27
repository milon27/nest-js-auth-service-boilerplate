import { Module } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { LoginModule } from "src/login/login.module"

@Module({
    imports: [LoginModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
