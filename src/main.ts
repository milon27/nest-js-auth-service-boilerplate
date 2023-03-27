import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { AppModule } from "./app.module"
import Constant from "./utils/constant/constant"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // global middleware
    app.enableCors({
        credentials: true,
        // origin: ['http://localhost:3001', 'http://localhost:9000'],
        origin: true,
    })
    app.use(cookieParser())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )
    app.setGlobalPrefix(Constant.GLOBAL_PREFIX)

    // todo: uncomment if we need to convert this into hybrid or micro service
    // const rmqService = app.get<RmqService>(RmqService)
    // app.connectMicroservice<RmqOptions>(rmqService.getOptions(Constant.RABBIT_MQ_AUTH_QUEUE), {
    //     inheritAppConfig: true,
    // })
    // await app.startAllMicroservices()

    const port = process.env.AUTH_PORT
    await app.listen(port, () => {
        console.log(`Auth Running on port ${port}`)
    })
}
bootstrap()
