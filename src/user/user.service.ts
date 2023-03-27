import { Injectable } from "@nestjs/common"
import { IJwtUser } from "../auth/interface/jwt-user.interface"
import { DatabaseService } from "../database/database.service"
import { CreateUserDto } from "./dto/create-user.dto"

@Injectable()
export class UserService {
    constructor(private database: DatabaseService) {}

    async getUserById(id: string) {
        return this.database.user.findUnique({ where: { id } })
    }

    async getUserByIdentifier(identifier: string) {
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

        if (user) {
            return {
                id: user.id,
                role: user.role,
            } as IJwtUser
        }
        return undefined
    }

    async createUser(userDto: CreateUserDto) {
        // todo: hash the password
        const user = await this.database.user.create({
            data: {
                email: userDto.email,
                fullName: userDto.name,
                password: userDto.password,
                role: {
                    connectOrCreate: {
                        create: {
                            slug: "customer",
                            title: "Customer",
                            permissions: {
                                create: [
                                    {
                                        modelName: "test",
                                    },
                                ],
                            },
                        },
                        where: {
                            slug: "customer",
                        },
                    },
                },
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

        if (user) {
            return {
                id: user.id,
                role: user.role,
            } as IJwtUser
        }
        return undefined
    }
}
