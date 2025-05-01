import { LocationsEnum } from "./enums/location.enum";
import { Reservations } from "./reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('parking_spots') 
export class Parking_spots {
        @PrimaryGeneratedColumn('uuid')
        id: string;

        @Column({type: 'enum', enum: LocationsEnum, default: LocationsEnum.Minsk})
        location: LocationsEnum;

        @OneToMany(() => Reservations, (reservation) => reservation.parking_spot)
          reservations: Reservations[];
}