import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { createBookingDto } from './dto/create-booking.dto';
import { updateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
    
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>
        ) {}

    findAll(): Promise<Booking[]> {
        return this.bookingRepository.find({
            relations: ['user', 'room']
        })
    }

    findAllUser(userDni: string): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: {
                userDni
            },
            relations: ['user', 'room']
        })
    }
    
    async findOne(userDni: string, admissionDate: Date): Promise<Booking | HttpException> {
        const bookingFound = await this.bookingRepository.findOne({
            where: {
                userDni,
                admissionDate
            },
            relations: ['user', 'room']
        })
        if (!bookingFound) {
            return new HttpException('Reserva no encontrada', HttpStatus.NOT_FOUND)
        }
        
        return bookingFound
    }

    async create(booking: createBookingDto): Promise<Booking | HttpException> {
        const bookingFound = await this.bookingRepository.findOne({
            where: {
                userDni: booking.userDni,
                admissionDate: booking.admissionDate
            }
        })
        if (bookingFound) {
            return new HttpException('Reserva existente', HttpStatus.BAD_REQUEST)
        }
        
        const newBooking = this.bookingRepository.create(booking)

        return this.bookingRepository.save(newBooking)
    }

    async checkin(userDni: string, admissionDate: Date) {
        const bookingFound = await this.bookingRepository.findOne({
            where: {
                userDni,
                admissionDate
            }
        })
        if (!bookingFound) {
            return new HttpException('Reserva inexistente', HttpStatus.NOT_FOUND)
        }
        
        bookingFound.status = 'En curso'
        return this.bookingRepository.save(bookingFound)
    }
    
    async checkout(userDni: string, admissionDate: Date) {
        const bookingFound = await this.bookingRepository.findOne({
            where: {
                userDni,
                admissionDate
            }
        })
        if (!bookingFound) {
            return new HttpException('Reserva inexistente', HttpStatus.NOT_FOUND)
        }
        
        bookingFound.status = 'Finalizada'
        return this.bookingRepository.save(bookingFound)
    }
    
    async cancel(userDni: string, admissionDate: Date) {
        const bookingFound = await this.bookingRepository.findOne({
            where: {
                userDni,
                admissionDate
            }
        })
        if (!bookingFound) {
            return new HttpException('Reserva inexistente', HttpStatus.NOT_FOUND)
        }
        
        bookingFound.status = 'Cancelada'
        return this.bookingRepository.save(bookingFound)
    }
}
