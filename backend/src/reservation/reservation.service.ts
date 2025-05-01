import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'database/entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {

        constructor(
            @InjectRepository(Reservation)
            private readonly spotRepo: Repository<Reservation>
        ) {}
}
