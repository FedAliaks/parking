import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'database/entities/reservation.entity';
import { User } from 'database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
