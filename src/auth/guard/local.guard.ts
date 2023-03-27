import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { LocalStrategyName } from "../strategy/local.strategy"

@Injectable()
export class LocalAuthGuard extends AuthGuard(LocalStrategyName) {}
