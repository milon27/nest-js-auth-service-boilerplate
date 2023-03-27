import { Injectable } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"

@Injectable()
export class UserService {
    constructor(private database: DatabaseService) {}

    async getUserById(id: string) {
        return this.database.user.findUnique({ where: { id } })
    }
}
