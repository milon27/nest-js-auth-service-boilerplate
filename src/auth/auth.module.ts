import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalStrategy } from "./strategy/local.strategy"

@Module({
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
