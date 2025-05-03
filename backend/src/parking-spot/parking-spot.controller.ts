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
  async getAllBlockedSlotsByDate(
    @Param('id') id: string,
    @Query('date') date: string,
  ) {
    return this.parkingSpotService.getAllBlockedSlotsByDate(id, date);
  }

  @Get(':id/available-dates')
  async getAllBlockedSlotsByIdSlot(@Param('id') id: string) {
    return this.parkingSpotService.getAllBlockedSlotsByIdSlot(id);
  }

  @Get(':id')
  async getParkingSlotById(@Param('id') id: string) {
    return this.parkingSpotService.getParkingSlotById(id);
  }
}
