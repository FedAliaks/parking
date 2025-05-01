import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parking_spots')
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  name: string

  @Column()
  location: string
}
