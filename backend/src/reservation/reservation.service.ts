import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'database/entities/reservation.entity';
import { Repository } from 'typeorm';
import { SetReservationDTO } from './dto/set-reservation.dto';
import { User } from 'database/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

  async getAllReservationByUserId(id: string) {
    await this.isUserIdValid(id);
    return this.reservationRepo.find({
      where: { user_id: id },
      order: { reserved_date: 'DESC', reserved_time: 'DESC' },
    });
  }

  async deleteReservation(id: string) {
    await this.isReservationIdValid(id);
    return await this.reservationRepo.delete(id);
  }

  private async isReservationIdValid(id: string) {
    const reservation = await this.reservationRepo.findOne({
      where: { id: id },
    });
    if (!reservation) {
      throw new NotFoundException('Reservation has not found');
    }
  }

  private async isUserIdValid(id: string) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User has not found');
    }
  }
}
