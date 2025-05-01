import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { SetReservationDTO } from './dto/set-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async setReservation(@Body() dto: SetReservationDTO) {
    return this.reservationService.setReservation(dto);
  }
}
