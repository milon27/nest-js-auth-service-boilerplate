import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./module/auth/auth.module"
import { DatabaseModule } from "./module/database/database.module"
import { LoginModule } from "./module/login/login.module"
import { RegisterModule } from "./module/register/register.module"
import { UploadModule } from "./module/upload/upload.module"
import { UserModule } from "./module/user/user.module"

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
        UploadModule,
        // RmqModule,
    ],
})
export class AppModule {}
