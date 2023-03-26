import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userService: Repository<User>) {}

    findAll(): Promise<User[]> {
        return this.userService.find()
    }
    
    async findOne(dni: string): Promise<User | HttpException> {
        const userFound = await this.userService.findOne({
            where: {
                dni
            }
        })
        if (!userFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return userFound
    }

    async create(user: createUserDto): Promise<User | HttpException> {
        const userFoundDni = await this.userService.findOne({
            where: {
                dni: user.dni
            }
        })
        if (userFoundDni) {
            return new HttpException('El dni ya existe', HttpStatus.BAD_REQUEST)
        }
        
        const userFoundEmail = await this.userService.findOne({
            where: {
                email: user.email
            }
        })
        if (userFoundEmail) {
            return new HttpException('El email ya existe', HttpStatus.BAD_REQUEST)
        }

        const newUser = this.userService.create(user)

        return this.userService.save(newUser)
    }

    async update(dni: string, user: updateUserDto) {
        const userFound = await this.userService.findOne({
            where: {
                dni
            }
        })
        if (!userFound) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }
        
        const updateUser = Object.assign(userFound, user)
        return this.userService.save(updateUser)
    }
    
    async delete(dni: string) {
        const result = await this.userService.delete({dni})
    
        if (result.affected == 0) {
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
