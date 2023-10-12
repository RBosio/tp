import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { loginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}
    
    async login(userLogin: AuthLoginDto): Promise<loginResponseDto | HttpException> {
        const userFound = await this.userService.findOneByEmail(userLogin.email)

        if (await userFound.comparePassword(userLogin.password)) {
            const { roles } = userFound

            const payload = { name: userFound.name, surname: userFound.surname, sub: userFound.dni, roles: roles.map(role => role.name.toLowerCase()) };

            this.logger.log('Login user - ' + userFound.dni + ' - ' + userFound.email)

            return {token: await this.jwtService.signAsync(payload)}
        } else {
            throw new HttpException('Email o contraseña incorrectos', HttpStatus.UNAUTHORIZED)
        }
    }
}
