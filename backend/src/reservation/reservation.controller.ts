import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { SetReservationDTO } from './dto/set-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async setReservation(@Body() dto: SetReservationDTO) {
    return this.reservationService.setReservation(dto);
  }

  @Get(':id')
  async getAllReservationByUserId(
    @Param('id') id: string,
    @Query('parkingSlotId') parkingSlotId: string,
  ) {
    return this.reservationService.getAllReservationByUserId(id, parkingSlotId);
  }

  @Delete(':id')
  async deleteReservationById(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }
}
