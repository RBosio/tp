import { Controller } from '@nestjs/common';
import { Body, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { createBookingDto } from './dto/create-booking.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('booking')
export class BookingController {
    
    constructor(private bookingService: BookingService) {}

    @Get()
    @Roles(RoleEnum.Seller)
    getBookings(): Promise<Booking[]> {
        return this.bookingService.findAll()
    }
    
    @Get('rooms/:admission/:departure')
    @Roles(RoleEnum.User)
    getRoomsAvailable(@Param('admission') admission: Date, @Param('departure') departure: Date): Promise<Booking[]> {
        return this.bookingService.findAllAvailable(admission, departure)
    }

    @Get(':userDni')
    @Roles(RoleEnum.Seller)
    getBookingsUser(@Param('userDni') userDni: string): Promise<Booking[]> {
        return this.bookingService.findAllUser(userDni)
    }
    
    @Get(':userDni/:admissionDate')
    @Roles(RoleEnum.Seller)
    getBooking(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.findOne(userDni, admissionDate)
    }

    @Post()
    @Roles(RoleEnum.User)
    createBooking(@Body() booking: createBookingDto): Promise<Booking | HttpException> {
        return this.bookingService.create(booking)
    }

    @Patch('checkin/:userDni/:admissionDate')
    @Roles(RoleEnum.Seller)
    checkin(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.checkin(userDni, admissionDate)
    }
    
    @Patch('checkout/:userDni/:admissionDate')
    @Roles(RoleEnum.Seller)
    checkout(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.checkout(userDni, admissionDate)
    }
    
    @Patch('cancel/:userDni/:admissionDate')
    @Roles(RoleEnum.Seller)
    cancelBooking(@Param('userDni') userDni: string, @Param('admissionDate') admissionDate: Date): Promise<Booking | HttpException> {
        return this.bookingService.cancel(userDni, admissionDate)
    }
}
