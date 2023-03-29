import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}
    
    async login(userLogin: AuthLoginDto): Promise<AuthLoginResponseDto | HttpException> {
        const userFound = await this.userService.findOneByEmail(userLogin.email)

        if (await userFound.comparePassword(userLogin.password)) {
            const user = new User()
            
            user.name = userFound.name
            user.surname = userFound.surname

            return {user, token: 'asdjoisadnoandi'}
        } else {
            throw new HttpException('Email o contraseña incorrectos', HttpStatus.UNAUTHORIZED)
        }
    }
}
