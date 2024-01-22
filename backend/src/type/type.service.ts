import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createTypeDto } from './dto/create-type.dto';
import { updateTypeDto } from './dto/update-type.dto';
import { Type } from './type.entity';

@Injectable()
export class TypeService {

    constructor(@InjectRepository(Type) private typeRepository: Repository<Type>) {}

    findAll(): Promise<Type[]> {
        return this.typeRepository.find()
    }
    
    async findOne(id: number): Promise<Type | HttpException> {
        const typeFound = await this.typeRepository.findOne({
            where: {
                id
            }
        })
        if (!typeFound) {
            throw new HttpException('Tipo no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return typeFound
    }

    async create(type: createTypeDto): Promise<Type | HttpException> {
        const typeFound = await this.typeRepository.findOne({
            where: {
                name: type.name
            }
        })
        if (typeFound) {
            throw new HttpException('El nombre ya existe', HttpStatus.BAD_REQUEST)
        }

        const newType = this.typeRepository.create(type)

        return this.typeRepository.save(newType)
    }

    async update(id: number, type: updateTypeDto) {
        const typeFound = await this.typeRepository.findOne({
            where: {
                id
            }
        })
        if (!typeFound) {
            throw new HttpException('Tipo no encontrado', HttpStatus.NOT_FOUND)
        }
        
        const updateType = Object.assign(typeFound, type)
        return this.typeRepository.save(updateType)
    }
    
    async delete(id: number) {
        const result = await this.typeRepository.delete({id})
    
        if (result.affected == 0) {
            throw new HttpException('Tipo no encontrado', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
