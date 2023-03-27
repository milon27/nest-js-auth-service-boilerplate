import { Global, Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { LocalStrategy } from "./strategy/local.strategy"

// @Global() // making it global because it will use in protected guard and guard is using in user module
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>("JWT_SECRET"),
                    signOptions: {
                        issuer: configService.get<string>("JWT_ISSUER"),
                        expiresIn: "60s",
                    },
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}