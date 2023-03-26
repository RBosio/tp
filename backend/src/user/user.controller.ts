import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.findAll()
    }
    
    @Get(':dni')
    getUser(@Param('dni') dni: string): Promise<User | HttpException> {
        return this.userService.findOne(dni)
    }

    @Post()
    createUser(@Body() user: createUserDto): Promise<User | HttpException> {
        return this.userService.create(user)
    }

    @Patch(':dni')
    updateUser(@Param('dni') dni: string, @Body() user: updateUserDto) {
        return this.userService.update(dni, user)
    }

    @Delete(':dni')
    deleteUser(@Param('dni') dni: string) {
        return this.userService.delete(dni)
    }
}
