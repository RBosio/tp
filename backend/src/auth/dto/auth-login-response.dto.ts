import { User } from "src/user/user.entity"

export class AuthLoginResponseDto {
    user: User
    token: string
}