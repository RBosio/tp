import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createRoleDto } from './dto/create-role.dto';
import { updateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Roles } from './roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('role')
export class RoleController {

    constructor(private roleService: RoleService) {}

    @Get()
    @Roles(RoleEnum.Admin)
    getRoles(): Promise<Role[]> {
        return this.roleService.findAll()
    }
    
    @Get(':id')
    @Roles(RoleEnum.Admin)
    getRole(@Param('id', ParseIntPipe) id: number): Promise<Role | HttpException> {
        return this.roleService.findOne(id)
    }

    @Post()
    @Roles(RoleEnum.Admin)
    createRole(@Body() role: createRoleDto): Promise<Role | HttpException> {
        return this.roleService.create(role)
    }

    @Patch(':id')
    @Roles(RoleEnum.Admin)
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: updateRoleDto) {
        return this.roleService.update(id, role)
    }

    @Delete(':id')
    @Roles(RoleEnum.Admin)
    deleteRole(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.delete(id)
    }
}
