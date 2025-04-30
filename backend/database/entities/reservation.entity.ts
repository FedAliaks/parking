import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Parking_spots } from "./parking_spots.entity";


@Entity('reservations')
export class Reservations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Parking_spots, (Parking_spots) => Parking_spots.reservations)
  @JoinColumn({ name: 'parking_spot_id' })
  parking_spot: Parking_spots;

  @Column({ type: 'timestamp' })
  reserved_date: Date;

  @Column({ type: 'timestamp' })
  reserved_time: Date;

  @Column({type: 'boolean'})
  status: boolean
}