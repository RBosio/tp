import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createProvinceDto } from './dto/create-province.dto';
import { updateProvinceDto } from './dto/update-province.dto';
import { Province } from './province.entity';
import { ProvinceService } from './province.service';

@UseGuards(AuthGuard)
@Controller('province')
export class ProvinceController {

    constructor(private provinceService: ProvinceService) {}

    @Get()
    getProvinces(): Promise<Province[]> {
        return this.provinceService.findAll()
    }
    
    @Get(':id')
    getProvince(@Param('id', ParseIntPipe) id: number): Promise<Province | HttpException> {
        return this.provinceService.findOne(id)
    }

    @Post()
    createProvince(@Body() province: createProvinceDto): Promise<Province | HttpException> {
        return this.provinceService.create(province)
    }

    @Patch(':id')
    updateProvince(@Param('id', ParseIntPipe) id: number, @Body() province: updateProvinceDto) {
        return this.provinceService.update(id, province)
    }

    @Delete(':id')
    deleteProvince(@Param('id', ParseIntPipe) id: number) {
        return this.provinceService.delete(id)
    }
}
