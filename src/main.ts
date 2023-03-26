import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const port = process.env.AUTH_PORT
    await app.listen(port, () => {
        console.log(`Auth Running on port ${port}`)
    })
}
bootstrap()
