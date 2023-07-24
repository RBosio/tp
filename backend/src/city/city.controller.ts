import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, UseGuards } from '@nestjs/common';
import { createCityDto } from './dto/create-city.dto';
import { updateCityDto } from './dto/update-city.dto';
import { City } from './city.entity';
import { CityService } from './city.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@Controller('city')
export class CityController {

    constructor(private cityService: CityService) {}

    @Get()
    getCities(): Promise<City[]> {
        return this.cityService.findAll()
    }
    
    @Get(':zipCode')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    getCity(@Param('zipCode') zipCode: string): Promise<City | HttpException> {
        return this.cityService.findOne(zipCode)
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    createCity(@Body() city: createCityDto): Promise<City | HttpException> {
        return this.cityService.create(city)
    }

    @Patch(':zipCode')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    updateCity(@Param('zipCode') zipCode: string, @Body() city: updateCityDto) {
        return this.cityService.update(zipCode, city)
    }

    @Delete(':zipCode')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    deleteCity(@Param('zipCode') zipCode: string) {
        return this.cityService.delete(zipCode)
    }
}
