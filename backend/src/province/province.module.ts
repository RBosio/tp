import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from 'src/country/country.module';
import { ProvinceController } from './province.controller';
import { Province } from './province.entity';
import { ProvinceService } from './province.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Province]),
    CountryModule
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService]
})
export class ProvinceModule {}
