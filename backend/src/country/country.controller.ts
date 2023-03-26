import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException } from '@nestjs/common';
import { createCountryDto } from './dto/create-country.dto';
import { updateCountryDto } from './dto/update-country.dto';
import { Country } from './country.entity';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {

    constructor(private countryService: CountryService) {}

    @Get()
    getCountries(): Promise<Country[]> {
        return this.countryService.findAll()
    }
    
    @Get(':id')
    getCountry(@Param('id') id: number): Promise<Country | HttpException> {
        return this.countryService.findOne(id)
    }

    @Post()
    createCountry(@Body() country: createCountryDto): Promise<Country | HttpException> {
        return this.countryService.create(country)
    }

    @Patch(':id')
    updateCountry(@Param('id') id: number, @Body() country: updateCountryDto) {
        return this.countryService.update(id, country)
    }

    @Delete(':id')
    deleteCountry(@Param('id') id: number) {
        return this.countryService.delete(id)
    }
}
