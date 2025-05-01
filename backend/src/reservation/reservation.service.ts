import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'database/entities/reservation.entity';
import { Repository } from 'typeorm';
import { SetReservationDTO } from './dto/set-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async setReservation(dto: SetReservationDTO) {
    const originalDate = new Date(dto.date);
    originalDate.setMinutes(0, 0, 0);
    const reservedDate = dto.date.toISOString().split('T')[0];
    const reservedTime = originalDate.toTimeString().split(' ')[0];

    const reservation = this.reservationRepo.create({
      user_id: dto.user,
      parking_spot_id: dto.spot,
      reserved_date: reservedDate,
      reserved_time: reservedTime,
      status: true,
    });

    return this.reservationRepo.save(reservation);
  }
}
