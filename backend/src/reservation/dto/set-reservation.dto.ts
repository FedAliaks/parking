import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class SetReservationDTO {
  @IsString()
  user: string;

  @IsString()
  spot: string;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
