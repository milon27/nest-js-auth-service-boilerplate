import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { DatabaseModule } from "./database/database.module"
import { LoginModule } from "./login/login.module"
import { RegisterModule } from "./register/register.module"
import { UserModule } from "./user/user.module"
import { RmqModule } from './rmq/rmq.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        AuthModule,
        LoginModule,
        RegisterModule,
        UserModule,
        RmqModule,
    ],
})
export class AppModule {}
