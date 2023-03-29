import { Permission, Role } from "@prisma/client"

export interface IJwtUser {
    id: string
    role: Role & { permissions: Permission[] }
}

export interface IJwtUserWithToken extends IJwtUser {
    accessToken: string
}
