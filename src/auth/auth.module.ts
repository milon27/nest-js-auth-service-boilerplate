import { Global, Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { UserModule } from "../user/user.module"
import { AuthService } from "./auth.service"
import { GoogleStrategy } from "./strategy/google.strategy"
import { LocalStrategy } from "./strategy/local.strategy"

@Global() // making it global because it will use in protected guard and guard is using in user module
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>("JWT_SECRET"),
                    signOptions: {
                        issuer: configService.get<string>("JWT_ISSUER"),
                        expiresIn: configService.get<string>("JWT_EXPIRE"),
                    },
                }
            },
            inject: [ConfigService],
        }),
        UserModule,
    ],
    providers: [AuthService, LocalStrategy, GoogleStrategy],
    exports: [AuthService],
})
export class AuthModule {}
