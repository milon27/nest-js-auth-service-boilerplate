import { Module } from "@nestjs/common"
import { RmqModule } from "../rmq/rmq.module"
import Constant from "../utils/constant/constant"
import { RegisterController } from "./register.controller"

@Module({
    imports: [
        // RmqModule.register({
        //     queueName: Constant.RABBIT_MQ_TEST1_QUEUE,
        // }),
    ],
    controllers: [RegisterController],
})
export class RegisterModule {}
