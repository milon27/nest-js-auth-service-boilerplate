import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { DatabaseService } from "src/database/database.service"
import { IJwtUser } from "./interface/jwt-user.interface"

@Injectable()
export class AuthService {
    constructor(private database: DatabaseService, private jwtService: JwtService) {}

    async validateUser(identifier: string, password: string): Promise<IJwtUser | undefined> {
        const user = await this.database.user.findUnique({
            where: {
                email: identifier,
            },
            select: {
                id: true,
                email: true,
                role: {
                    include: {
                        permissions: true,
                    },
                },
            },
        })
        // todo: check password with bcrypt
        if (!password) {
            return undefined
        }
        if (user) {
            return {
                id: user.id,
                role: user.role,
            } as IJwtUser
        }
        return undefined
    }

    generateJwtToken(payload: IJwtUser) {
        return this.jwtService.sign(payload)
    }

    verifyJwtToken(token: string) {
        return this.jwtService.verify<IJwtUser>(token)
    }
}
