import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraController } from './extra.controller';
import { Extra } from './extra.entity';
import { ExtraService } from './extra.service';

@Module({
  imports: [TypeOrmModule.forFeature([Extra])],
  controllers: [ExtraController],
  providers: [ExtraService]
})
export class ExtraModule {}
