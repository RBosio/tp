import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';
import { Request } from 'express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DataSource } from 'typeorm';
import * as fs from "fs";
import { UserService } from './user/user.service';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            messageKey: 'message'
          }
        },
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER]
          }
        },
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined
          },
          res: () => {
            return undefined
          }
        }
      }
    }),
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
        dropSchema: configService.get('DB_DROP')
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
    BookingModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  constructor(
    private dataSource: DataSource,
    private userService: UserService) {
    const queryRunner = this.dataSource.createQueryRunner()
  
    this.userService.loadUsers()
    .then(() => {
      const queries = readSqlFile('public/defaultData.sql')
  
      queries.forEach(query => {
        queryRunner.query(query)
      })
    })
  }
  
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*')
  }
}

const readSqlFile = (filepath: string): string[] => {
  return fs
    .readFileSync(join(__dirname, '..', filepath))
    .toString()
    .replace(/\r?\n|\r/g, '')
    .split(';')
    .filter((query) => query?.length);
};