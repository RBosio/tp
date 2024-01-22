import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createRoleDto } from './dto/create-role.dto';
import { updateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    findAll(): Promise<Role[]> {
        return this.roleRepository.find()
    }
    
    async findOne(id: number): Promise<Role | HttpException> {
        const roleFound = await this.roleRepository.findOne({
            where: {
                id
            }
        })
        if (!roleFound) {
            throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return roleFound
    }

    async create(role: createRoleDto): Promise<Role | HttpException> {
        const roleFound = await this.roleRepository.findOne({
            where: {
                name: role.name
            }
        })
        if (roleFound) {
            throw new HttpException('El nombre ya existe', HttpStatus.BAD_REQUEST)
        }

        const newRole = this.roleRepository.create(role)

        return this.roleRepository.save(newRole)
    }

    async update(id: number, role: updateRoleDto) {
        const roleFound = await this.roleRepository.findOne({
            where: {
                id
            }
        })
        if (!roleFound) {
            throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND)
        }
        
        const updateRole = Object.assign(roleFound, role)
        return this.roleRepository.save(updateRole)
    }
    
    async delete(id: number) {
        const result = await this.roleRepository.delete({id})
    
        if (result.affected == 0) {
            throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
