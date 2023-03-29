import { Module } from "@nestjs/common"
import { UserModule } from "../user/user.module"
import { RegisterController } from "./register.controller"

@Module({
    imports: [
        // RmqModule.register({
        //     queueName: Constant.RABBIT_MQ_TEST1_QUEUE,
        // }),
        UserModule,
    ],
    controllers: [RegisterController],
})
export class RegisterModule {}
