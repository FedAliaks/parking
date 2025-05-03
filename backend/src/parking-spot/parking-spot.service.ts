import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpot } from 'database/entities/parking_spots.entity';
import { Repository } from 'typeorm';
import { mockParkingSpots } from './helpers/mock-parking-spots';
import { Reservation } from 'database/entities/reservation.entity';

@Injectable()
export class ParkingSpotService implements OnModuleInit {
  constructor(
    @InjectRepository(ParkingSpot)
    private readonly parkingSpotRepo: Repository<ParkingSpot>,

    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async onModuleInit() {
    const count = await this.parkingSpotRepo.count();
    if (count) return;
    await this.parkingSpotRepo.save(mockParkingSpots);
    console.log('Parking spots have created');
  }

  async findAll() {
    return this.parkingSpotRepo.find();
  }

  async getParkingSlotById(id: string) {
    await this.isValidParkingSlot(id);

    return this.parkingSpotRepo.findOne({
      where: { id: id },
    });
  }

  async getAllBlockedSlotsByDate(id: string, date: string) {
    await this.isValidParkingSlot(id);
    this.isValidDateString(date);

    return this.reservationRepo.find({
      where: { parking_spot_id: id, reserved_date: new Date(date) },
    });
  }

  async getAllBlockedSlotsByIdSlot(id: string) {
    await this.isValidParkingSlot(id);

    return this.reservationRepo.find({
      where: { parking_spot_id: id },
    });
  }

  private async isValidParkingSlot(id: string) {
    const parking = await this.parkingSpotRepo.findOne({ where: { id: id } });
    if (!parking) {
      throw new NotFoundException('Parking slot has not found');
    }
  }

  private isValidDateString(date: string) {
    const parsed = Date.parse(date);
    if (isNaN(parsed) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new BadRequestException(
        'Invalid date format as query date. Use YYYY-MM-DD',
      );
    }
  }
}
