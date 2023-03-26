import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCityDto } from './dto/create-city.dto';
import { updateCityDto } from './dto/update-city.dto';
import { City } from './city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City) private cityRepository: Repository<City>
        ) {}

    findAll(): Promise<City[]> {
        return this.cityRepository.find({
            relations: ['province']
        })
    }
    
    async findOne(id: number): Promise<City | HttpException> {
        const cityFound = await this.cityRepository.findOne({
            where: {
                id
            },
            relations: ['province']
        })
        if (!cityFound) {
            return new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND)
        }
        
        return cityFound
    }

    async create(city: createCityDto): Promise<City | HttpException> {
        const cityFound = await this.cityRepository.findOne({
            where: {
                name: city.name
            }
        })
        if (cityFound) {
            return new HttpException('El nombre ya existe', HttpStatus.BAD_REQUEST)
        }
        
        const newCity = this.cityRepository.create(city)

        return this.cityRepository.save(newCity)
    }

    async update(id: number, city: updateCityDto) {
        const cityFound = await this.cityRepository.findOne({
            where: {
                id
            }
        })
        if (!cityFound) {
            return new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND)
        }
        
        const updateCity = Object.assign(cityFound, city)
        return this.cityRepository.save(updateCity)
    }
    
    async delete(id: number) {
        const result = await this.cityRepository.delete({id})
    
        if (result.affected == 0) {
            return new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
