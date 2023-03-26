import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException } from '@nestjs/common';
import { createCityDto } from './dto/create-city.dto';
import { updateCityDto } from './dto/update-city.dto';
import { City } from './city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private cityService: CityService) {}

    @Get()
    getCities(): Promise<City[]> {
        return this.cityService.findAll()
    }
    
    @Get(':id')
    getCity(@Param('id') id: number): Promise<City | HttpException> {
        return this.cityService.findOne(id)
    }

    @Post()
    createCity(@Body() city: createCityDto): Promise<City | HttpException> {
        return this.cityService.create(city)
    }

    @Patch(':id')
    updateCity(@Param('id') id: number, @Body() city: updateCityDto) {
        return this.cityService.update(id, city)
    }

    @Delete(':id')
    deleteCity(@Param('id') id: number) {
        return this.cityService.delete(id)
    }
}
