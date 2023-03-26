import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe } from '@nestjs/common';
import { createExtraDto } from './dto/create-extra.dto';
import { updateExtraDto } from './dto/update-extra.dto';
import { Extra } from './extra.entity';
import { ExtraService } from './extra.service';

@Controller('extra')
export class ExtraController {

    constructor(private extraService: ExtraService) {}

    @Get()
    getExtras(): Promise<Extra[]> {
        return this.extraService.findAll()
    }
    
    @Get(':id')
    getExtra(@Param('id', ParseIntPipe) id: number): Promise<Extra | HttpException> {
        return this.extraService.findOne(id)
    }

    @Post()
    createExtra(@Body() extra: createExtraDto): Promise<Extra | HttpException> {
        return this.extraService.create(extra)
    }

    @Patch(':id')
    updateExtra(@Param('id', ParseIntPipe) id: number, @Body() extra: updateExtraDto) {
        return this.extraService.update(id, extra)
    }

    @Delete(':id')
    deleteExtra(@Param('id', ParseIntPipe) id: number) {
        return this.extraService.delete(id)
    }
}
