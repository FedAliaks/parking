import { Controller, Get, Param, Query } from '@nestjs/common';
import { ParkingSpotService } from './parking-spot.service';

@Controller('parking-spot')
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get()
  async getAllSpots() {
    return this.parkingSpotService.findAll();
  }

  @Get(':id/available-times')
  async getAllBlockedSlots(
    @Param('id') id: string,
    @Query('date') date: string,
  ) {
    return this.parkingSpotService.getAllBlockedSlots(id, date);
  }
}
