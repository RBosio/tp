import { Controller } from '@nestjs/common';
import { Body, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { createBookingDto } from './dto/create-booking.dto';

@UseGuards(AuthGuard)
@Controller('booking')
export class BookingController {
    
    constructor(private bookingService: BookingService) {}

    @Get()
    getBookings(): Promise<Booking[]> {
        return this.bookingService.findAll()
    }

    @Get(':userDni')
    getBookingsUser(@Param('userDni') userDni: string): Promise<Booking[]> {
        return this.bookingService.findAllUser(userDni)
    }
    
    @Get(':userDni/:admissionDate')
    getBooking(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.findOne(userDni, admissionDate)
    }

    @Post()
    createBooking(@Body() booking: createBookingDto): Promise<Booking | HttpException> {
        return this.bookingService.create(booking)
    }

    @Patch('checkin/:userDni/:admissionDate')
    checkin(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.checkin(userDni, admissionDate)
    }
    
    @Patch('checkout/:userDni/:admissionDate')
    checkout(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.checkout(userDni, admissionDate)
    }
    
    @Patch('cancel/:userDni/:admissionDate')
    cancelBooking(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.cancel(userDni, admissionDate)
    }
}
