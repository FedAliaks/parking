import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  async getAllReservationByUserId(@Param('id') id: string) {
    return this.reservationService.getAllReservationByUserId(id);
  }

  @Delete(':id')
  async deleteReservationById(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }
}
