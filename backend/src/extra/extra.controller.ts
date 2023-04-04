import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createExtraDto } from './dto/create-extra.dto';
import { updateExtraDto } from './dto/update-extra.dto';
import { Extra } from './extra.entity';
import { ExtraService } from './extra.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('extra')
export class ExtraController {

    constructor(private extraService: ExtraService) {}

    @Get()
    @Roles(RoleEnum.User)
    getExtras(): Promise<Extra[]> {
        return this.extraService.findAll()
    }
    
    @Get(':id')
    @Roles(RoleEnum.Admin)
    getExtra(@Param('id', ParseIntPipe) id: number): Promise<Extra | HttpException> {
        return this.extraService.findOne(id)
    }

    @Post()
    @Roles(RoleEnum.Admin)
    createExtra(@Body() extra: createExtraDto): Promise<Extra | HttpException> {
        return this.extraService.create(extra)
    }

    @Patch(':id')
    @Roles(RoleEnum.Admin)
    updateExtra(@Param('id', ParseIntPipe) id: number, @Body() extra: updateExtraDto) {
        return this.extraService.update(id, extra)
    }

    @Delete(':id')
    @Roles(RoleEnum.Admin)
    deleteExtra(@Param('id', ParseIntPipe) id: number) {
        return this.extraService.delete(id)
    }
}
