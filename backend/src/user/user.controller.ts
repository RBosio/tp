import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    @Roles(RoleEnum.Seller)
    getUsers(): Promise<User[]> {
        return this.userService.findAll()
    }
    
    @Get(':dni')
    @Roles(RoleEnum.Seller)
    getUser(@Param('dni') dni: string): Promise<User | HttpException> {
        return this.userService.findOneByDni(dni)
    }

    @Patch(':dni')
    @Roles(RoleEnum.User)
    updateUser(@Param('dni') dni: string, @Body() user: updateUserDto) {
        return this.userService.update(dni, user)
    }

    @Delete(':dni')
    @Roles(RoleEnum.Admin)
    deleteUser(@Param('dni') dni: string) {
        return this.userService.delete(dni)
    }
}
