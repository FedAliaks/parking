import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  parking_spot_id: string;

  @Column({ type: 'date' })
  reserved_date: Date;

  @Column({ type: 'time' })
  reserved_time: string;

  @Column({ type: 'boolean' })
  status: boolean;
}
