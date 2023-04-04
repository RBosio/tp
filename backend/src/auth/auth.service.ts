import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { loginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}
    
    async login(userLogin: AuthLoginDto): Promise<loginResponseDto | HttpException> {
        const userFound = await this.userService.findOneByEmail(userLogin.email)

        if (await userFound.comparePassword(userLogin.password)) {
            const { roles } = userFound

            const payload = { username: userFound.name, sub: userFound.dni, roles: roles.map(role => role.name.toLowerCase()) };

            return {token: await this.jwtService.signAsync(payload)}
        } else {
            throw new HttpException('Email o contraseña incorrectos', HttpStatus.UNAUTHORIZED)
        }
    }
}
