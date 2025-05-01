import { Module } from '@nestjs/common';
import { ParkingSpotController } from './parking-spot.controller';
import { ParkingSpotService } from './parking-spot.service';
import { ParkingSpot } from 'database/entities/parking_spots.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'database/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot, Reservation])],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
})
export class ParkingSpotModule {}
