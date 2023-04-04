import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createRoomDto } from './dto/create-room.dto';
import { updateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('room')
export class RoomController {

    constructor(private roomService: RoomService) {}

    @Get()
    @Roles(RoleEnum.User)
    getRooms(): Promise<Room[]> {
        return this.roomService.findAll()
    }
    
    @Get(':id')
    @Roles(RoleEnum.User)
    getRoom(@Param('id', ParseIntPipe) id: number): Promise<Room | HttpException> {
        return this.roomService.findOne(id)
    }

    @Post()
    @Roles(RoleEnum.Admin)
    createRoom(@Body() room: createRoomDto): Promise<Room | HttpException> {
        return this.roomService.create(room)
    }

    @Patch(':id')
    @Roles(RoleEnum.Admin)
    updateRoom(@Param('id', ParseIntPipe) id: number, @Body() room: updateRoomDto) {
        return this.roomService.update(id, room)
    }

    @Delete(':id')
    @Roles(RoleEnum.Admin)
    deleteRoom(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.delete(id)
    }
}
