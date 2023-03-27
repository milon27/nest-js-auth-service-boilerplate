import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { DatabaseModule } from "./database/database.module"
import { RegisterModule } from "./register/register.module"
import { LoginModule } from "./login/login.module"
import { AuthModule } from "./auth/auth.module"
import { UserModule } from './user/user.module';

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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
