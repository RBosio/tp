import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe } from '@nestjs/common';
import { createRoomDto } from './dto/create-room.dto';
import { updateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {

    constructor(private roomService: RoomService) {}

    @Get()
    getRooms(): Promise<Room[]> {
        return this.roomService.findAll()
    }
    
    @Get(':id')
    getRoom(@Param('id', ParseIntPipe) id: number): Promise<Room | HttpException> {
        return this.roomService.findOne(id)
    }

    @Post()
    createRoom(@Body() room: createRoomDto): Promise<Room | HttpException> {
        return this.roomService.create(room)
    }

    @Patch(':id')
    updateRoom(@Param('id', ParseIntPipe) id: number, @Body() room: updateRoomDto) {
        return this.roomService.update(id, room)
    }

    @Delete(':id')
    deleteRoom(@Param('id', ParseIntPipe) id: number) {
        return this.roomService.delete(id)
    }
}
