import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { Country } from './country/country.entity';
import { CountryModule } from './country/country.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Province } from './province/province.entity';
import { City } from './city/city.entity';
import { CityModule } from './city/city.module';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { Extra } from './extra/extra.entity';
import { ExtraModule } from './extra/extra.module';
import { Type } from './type/type.entity';
import { TypeModule } from './type/type.module';
import { Room } from './room/room.entity';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: 3306,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Country, Province, City, Role, Extra, Type, Room, Booking],
        synchronize: configService.get('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CountryModule,
    ProvinceModule,
    CityModule,
    RoleModule,
    ExtraModule,
    TypeModule,
    RoomModule,
    BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
