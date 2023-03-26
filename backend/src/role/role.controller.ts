import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe } from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { updateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) {}

    @Get()
    getCountries(): Promise<Role[]> {
        return this.roleService.findAll()
    }
    
    @Get(':id')
    getRole(@Param('id', ParseIntPipe) id: number): Promise<Role | HttpException> {
        return this.roleService.findOne(id)
    }

    @Post()
    createRole(@Body() role: createRoleDto): Promise<Role | HttpException> {
        return this.roleService.create(role)
    }

    @Patch(':id')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: updateRoleDto) {
        return this.roleService.update(id, role)
    }

    @Delete(':id')
    deleteRole(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.delete(id)
    }
}
