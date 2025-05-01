import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSpot } from 'database/entities/parking_spots.entity';
import { Repository } from 'typeorm';
import { mockParkingSpots } from './helpers/mock-parking-spots';

@Injectable()
export class ParkingSpotService implements OnModuleInit {
  constructor(
    @InjectRepository(ParkingSpot)
    private readonly spotRepo: Repository<ParkingSpot>,
  ) {}

  async onModuleInit() {
    const count = await this.spotRepo.count();
    if (count) return;
    await this.spotRepo.save(mockParkingSpots);
    console.log('Parking spots have created');
  }

  async findAll() {
    return this.spotRepo.find();
  }
}
