import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createExtraDto } from './dto/create-extra.dto';
import { updateExtraDto } from './dto/update-extra.dto';
import { Extra } from './extra.entity';

@Injectable()
export class ExtraService {

    constructor(@InjectRepository(Extra) private extraRepository: Repository<Extra>) {}

    findAll(): Promise<Extra[]> {
        return this.extraRepository.find()
    }
    
    async findOne(id: number): Promise<Extra | HttpException> {
        const extraFound = await this.extraRepository.findOne({
            where: {
                id
            }
        })
        if (!extraFound) {
            return new HttpException('Extra no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return extraFound
    }

    async create(extra: createExtraDto): Promise<Extra | HttpException> {
        const extraFound = await this.extraRepository.findOne({
            where: {
                name: extra.name
            }
        })
        if (extraFound) {
            return new HttpException('El nombre ya existe', HttpStatus.BAD_REQUEST)
        }

        const newExtra = this.extraRepository.create(extra)

        return this.extraRepository.save(newExtra)
    }

    async update(id: number, extra: updateExtraDto) {
        const extraFound = await this.extraRepository.findOne({
            where: {
                id
            }
        })
        if (!extraFound) {
            return new HttpException('Extra no encontrado', HttpStatus.NOT_FOUND)
        }
        
        const updateExtra = Object.assign(extraFound, extra)
        return this.extraRepository.save(updateExtra)
    }
    
    async delete(id: number) {
        const result = await this.extraRepository.delete({id})
    
        if (result.affected == 0) {
            return new HttpException('Extra no encontrado', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
