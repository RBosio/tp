import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCountryDto } from './dto/create-country.dto';
import { updateCountryDto } from './dto/update-country.dto';
import { Country } from './country.entity';

@Injectable()
export class CountryService {

    constructor(@InjectRepository(Country) private countryService: Repository<Country>) {}

    findAll(): Promise<Country[]> {
        return this.countryService.find()
    }
    
    async findOne(id: number): Promise<Country | HttpException> {
        const countryFound = await this.countryService.findOne({
            where: {
                id
            }
        })
        if (!countryFound) {
            return new HttpException('Pais no encontrado', HttpStatus.NOT_FOUND)
        }
        
        return countryFound
    }

    async create(country: createCountryDto): Promise<Country | HttpException> {
        const countryFoundDni = await this.countryService.findOne({
            where: {
                name: country.name
            }
        })
        if (countryFoundDni) {
            return new HttpException('El nombre ya existe', HttpStatus.BAD_REQUEST)
        }

        const newCountry = this.countryService.create(country)

        return this.countryService.save(newCountry)
    }

    async update(id: number, country: updateCountryDto) {
        const countryFound = await this.countryService.findOne({
            where: {
                id
            }
        })
        if (!countryFound) {
            return new HttpException('Pais no encontrado', HttpStatus.NOT_FOUND)
        }
        
        const updateCountry = Object.assign(countryFound, country)
        return this.countryService.save(updateCountry)
    }
    
    async delete(id: number) {
        const result = await this.countryService.delete({id})
    
        if (result.affected == 0) {
            return new HttpException('Pais no encontrado', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
