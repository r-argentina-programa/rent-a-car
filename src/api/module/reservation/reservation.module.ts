import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationRepository])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
