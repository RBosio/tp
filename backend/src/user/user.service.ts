import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RoleService
        ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find({
            relations: ['roles']
        })
    }
    
    async findOneByDni(dni: string) {
        const userFound = await this.userRepository.findOne({
            where: {
                dni
            },
            relations: ['roles']
        })
        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return userFound
    }

    async findOneByEmail(email: string) {
        const userFound = await this.userRepository.findOne({
            where: {
                email
            },
            relations: ['roles']
        })
        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return userFound
    }

    async create(user: createUserDto): Promise<User | HttpException> {
        const userFoundDni = await this.userRepository.findOne({
            where: {
                dni: user.dni
            }
        })
        if (userFoundDni) {
            throw new HttpException('El dni ya existe', HttpStatus.BAD_REQUEST)
        }
        
        const userFoundEmail = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        })
        if (userFoundEmail) {
            throw new HttpException('El email ya existe', HttpStatus.BAD_REQUEST)
        }

        const roles = await this.roleService.findAll()

        const newUser = this.userRepository.create(user)
        
        if (!user.role) {
            newUser.roles = roles.filter(role => role.name == 'User')
        } else {
            let rolesUser: Role[] = []
            user.role.forEach(id => {
                rolesUser.push(roles.filter(role => role.id == id)[0])
            })
            newUser.roles = rolesUser
        }

        this.logger.log('Creating user')

        return this.userRepository.save(newUser)
    }

    async update(dni: string, user: updateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                dni
            }
        })
        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }
        
        const updateUser = Object.assign(userFound, user)
        return this.userRepository.save(updateUser)
    }
    
    async delete(dni: string) {
        const result = await this.userRepository.delete({dni})
    
        if (result.affected == 0) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }

        return result
    }
    
    async loadUsers() {
        const user = this.userRepository.create({
            dni: '33429120',
            email: 'user@gmail.com',
            name: 'User',
            surname: 'User',
            password: '123456',
            phone: '33-333333'
        })
        await this.userRepository.save(user)
        
        const seller = this.userRepository.create({
            dni: '38233911',
            email: 'seller@gmail.com',
            name: 'Seller',
            surname: 'Seller',
            password: '123456',
            phone: '44-444444'
        })
        await this.userRepository.save(seller)
        
        const admin = this.userRepository.create({
            dni: '34266592',
            email: 'admin@gmail.com',
            name: 'Admin',
            surname: 'Admin',
            password: '123456',
            phone: '55-555555'
        })
        await this.userRepository.save(admin)
    }
}
