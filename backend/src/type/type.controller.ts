import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createTypeDto } from './dto/create-type.dto';
import { updateTypeDto } from './dto/update-type.dto';
import { Type } from './type.entity';
import { TypeService } from './type.service';

@UseGuards(AuthGuard)
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) {}

    @Get()
    getTypes(): Promise<Type[]> {
        return this.typeService.findAll()
    }
    
    @Get(':id')
    getType(@Param('id', ParseIntPipe) id: number): Promise<Type | HttpException> {
        return this.typeService.findOne(id)
    }

    @Post()
    createType(@Body() type: createTypeDto): Promise<Type | HttpException> {
        return this.typeService.create(type)
    }

    @Patch(':id')
    updateType(@Param('id', ParseIntPipe) id: number, @Body() type: updateTypeDto) {
        return this.typeService.update(id, type)
    }

    @Delete(':id')
    deleteType(@Param('id', ParseIntPipe) id: number) {
        return this.typeService.delete(id)
    }
}
