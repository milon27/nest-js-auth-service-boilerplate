import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcryptjs"
import Constant from "../../utils/constant/constant"
import { DatabaseService } from "../database/database.service"
import { CreateUserDto } from "./dto/create-user.dto"

@Injectable()
export class UserService {
    constructor(private database: DatabaseService) {}

    async getloggedInUser(id: string) {
        return this.database.user.findUnique({ where: { id } })
    }

    async getUserByIdentifier(identifier: string) {
        const user = await this.database.user.findUnique({
            where: {
                email: identifier,
            },
            include: {
                role: {
                    include: {
                        permissions: true,
                    },
                },
            },
        })

        if (user) {
            return user
        }
        return undefined
    }

    async createUser(userDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, await bcrypt.genSalt(10))
        const user = await this.database.user.create({
            data: {
                email: userDto.email,
                fullName: userDto.name,
                password: hashedPassword,
                role: {
                    connectOrCreate: {
                        create: {
                            slug: Constant.DEFAULT_ROLE,
                            title: Constant.DEFAULT_ROLE,
                        },
                        where: {
                            slug: Constant.DEFAULT_ROLE,
                        },
                    },
                },
            },
            include: {
                role: {
                    include: {
                        permissions: true,
                    },
                },
            },
        })

        if (user) {
            return user
        }
        return undefined
    }
}
