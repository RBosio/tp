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
import { City } from './province copy/city.entity';
import { CityModule } from './province copy/city.module';

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
        entities: [User, Country, Province, City],
        synchronize: configService.get('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CountryModule,
    ProvinceModule,
    CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
