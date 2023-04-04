import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { loginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService) {}
    
    @Post('login')
    login(@Body() userLogin: AuthLoginDto): Promise<loginResponseDto | HttpException> {
        return this.authService.login(userLogin)
    }

    @Post('signup')
    signup(@Body() user: createUserDto): Promise<User | HttpException> {
        return this.userService.create(user)
    }
}
