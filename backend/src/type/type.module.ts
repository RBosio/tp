import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from './type.controller';
import { Type } from './type.entity';
import { TypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService]
})
export class TypeModule {}
