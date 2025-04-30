import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reservations } from "./reservation.entity";


@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Reservations, (reservation) => reservation.user)
  reservations: Reservations[];
}