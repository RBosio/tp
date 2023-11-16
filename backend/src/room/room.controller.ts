import { Controller, Get, Post, Body, Param, Delete, Patch, HttpException, ParseIntPipe, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createRoomDto } from './dto/create-room.dto';
import { updateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';
import { RoomService } from './room.service';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

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

    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                storage: diskStorage({
                    destination: './public/uploads',
                    filename: (req, file, cb) => {
                        req.body.url = uuidv4() + '.' + file.originalname.split('.').slice(-1)
                        cb(null, req.body.url)
                    }
                })
            }
        )
    )
    
    @Post(':id/image')
    @Roles(RoleEnum.Seller)
    uploadImage(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
        const { body } = request

        return this.roomService.uploadImage(id, body.url)
    }
}
