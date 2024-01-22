import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createProvinceDto } from './dto/create-province.dto';
import { updateProvinceDto } from './dto/update-province.dto';
import { Province } from './province.entity';
import { ProvinceService } from './province.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoleEnum } from 'src/enums/role.enum';
import { Roles } from 'src/role/roles.decorator';

@Controller('province')
@UseGuards(AuthGuard, RolesGuard)
export class ProvinceController {
    
    constructor(private provinceService: ProvinceService) {}
    
    @Get()
    @Roles(RoleEnum.User, RoleEnum.Admin)
    getProvinces(): Promise<Province[]> {
        return this.provinceService.findAll()
    }
    
    @Get(':id')
    @Roles(RoleEnum.Admin)
    getProvince(@Param('id', ParseIntPipe) id: number): Promise<Province | HttpException> {
        return this.provinceService.findOne(id)
    }

    @Post()
    @Roles(RoleEnum.Admin)
    createProvince(@Body() province: createProvinceDto): Promise<Province | HttpException> {
        return this.provinceService.create(province)
    }

    @Patch(':id')
    @Roles(RoleEnum.Admin)
    updateProvince(@Param('id', ParseIntPipe) id: number, @Body() province: updateProvinceDto) {
        return this.provinceService.update(id, province)
    }

    @Delete(':id')
    @Roles(RoleEnum.Admin)
    deleteProvince(@Param('id', ParseIntPipe) id: number) {
        return this.provinceService.delete(id)
    }
}
