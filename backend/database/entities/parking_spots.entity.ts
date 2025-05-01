import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocationsEnum } from './enums/location.enum';

@Entity('parking_spots')
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: LocationsEnum, default: LocationsEnum.Minsk })
  location: LocationsEnum;
}
