import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/country.entity';
import { CountryService } from 'src/country/country.service';
import { Repository } from 'typeorm';
import { createProvinceDto } from './dto/create-province.dto';
import { updateProvinceDto } from './dto/update-province.dto';
import { Province } from './province.entity';

@Injectable()
export class ProvinceService {

    constructor(
        @InjectRepository(Province) private provinceRepository: Repository<Province>,
        private countryService: CountryService
        ) {}

    findAll(): Promise<Province[]> {
        return this.provinceRepository.find({
            relations: ['country']
        })
    }
    
    async findOne(id: number): Promise<Province | HttpException> {
        const provinceFound = await this.provinceRepository.findOne({
            where: {
                id
            },
            relations: ['country']
        })
        if (!provinceFound) {
            return new HttpException('Provincia no encontrada', HttpStatus.NOT_FOUND)
        }
        
        return provinceFound
    }

    async create(province: createProvinceDto): Promise<Province | HttpException> {
        const provinceFound = await this.provinceRepository.findOne({
            where: {
                name: province.name
            }
        })
        if (provinceFound) {
            return new HttpException('El nombre ya existe', HttpStatus.BAD_REQUEST)
        }

        const countryFound = this.countryService.findOne(province.countryId)
        if (!countryFound) {
            return new HttpException('Pais inexistente', HttpStatus.BAD_REQUEST)
        }

        const newProvince = this.provinceRepository.create(province)

        return this.provinceRepository.save(newProvince)
    }

    async update(id: number, province: updateProvinceDto) {
        const provinceFound = await this.provinceRepository.findOne({
            where: {
                id
            }
        })
        if (!provinceFound) {
            return new HttpException('Provincia no encontrada', HttpStatus.NOT_FOUND)
        }
        
        const updateProvince = Object.assign(provinceFound, province)
        return this.provinceRepository.save(updateProvince)
    }
    
    async delete(id: number) {
        const result = await this.provinceRepository.delete({id})
    
        if (result.affected == 0) {
            return new HttpException('Provincia no encontrada', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
