import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createRoomDto } from './dto/create-room.dto';
import { updateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {

    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

    findAll(): Promise<Room[]> {
        return this.roomRepository.find({
            relations: ['type']
        })
    }
    
    async findOne(id: number) {
        const roomFound = await this.roomRepository.findOne({
            where: {
                id
            },
            relations: ['type']
        })
        if (!roomFound) {
            throw new HttpException('Habitacion no encontrada', HttpStatus.NOT_FOUND)
        }
        
        return roomFound
    }

    async create(room: createRoomDto): Promise<Room | HttpException> {
        const newRoom = this.roomRepository.create(room)

        return this.roomRepository.save(newRoom)
    }

    async update(id: number, room: updateRoomDto) {
        const roomFound = await this.roomRepository.findOne({
            where: {
                id
            }
        })
        if (!roomFound) {
            throw new HttpException('Habitacion no encontrada', HttpStatus.NOT_FOUND)
        }
        
        const updateRoom = Object.assign(roomFound, room)
        return this.roomRepository.save(updateRoom)
    }
    
    async delete(id: number) {
        const result = await this.roomRepository.delete({id})
    
        if (result.affected == 0) {
            throw new HttpException('Habitacion no encontrada', HttpStatus.NOT_FOUND)
        }

        return result
    }
}
