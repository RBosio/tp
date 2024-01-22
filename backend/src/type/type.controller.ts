import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createTypeDto } from './dto/create-type.dto';
import { updateTypeDto } from './dto/update-type.dto';
import { Type } from './type.entity';
import { TypeService } from './type.service';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) {}

    @Get()
    @Roles(RoleEnum.User, RoleEnum.Admin)
    getTypes(): Promise<Type[]> {
        return this.typeService.findAll()
    }
    
    @Get(':id')
    @Roles(RoleEnum.User, RoleEnum.Seller, RoleEnum.Admin)
    getType(@Param('id', ParseIntPipe) id: number): Promise<Type | HttpException> {
        return this.typeService.findOne(id)
    }

    @Post()
    @Roles(RoleEnum.Admin)
    createType(@Body() type: createTypeDto): Promise<Type | HttpException> {
        return this.typeService.create(type)
    }

    @Patch(':id')
    @Roles(RoleEnum.Admin)
    updateType(@Param('id', ParseIntPipe) id: number, @Body() type: updateTypeDto) {
        return this.typeService.update(id, type)
    }

    @Delete(':id')
    @Roles(RoleEnum.Admin)
    deleteType(@Param('id', ParseIntPipe) id: number) {
        return this.typeService.delete(id)
    }
}
