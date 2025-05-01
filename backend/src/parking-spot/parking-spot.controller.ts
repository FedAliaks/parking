import { Controller, Get } from '@nestjs/common';
import { ParkingSpotService } from './parking-spot.service';

@Controller('parking-spot')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get()
  async getAllSpots() {
    return this.parkingSpotService.findAll();
  }
}
