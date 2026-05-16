import { IsNumber, IsPositive, IsDateString, Min, Max, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { IsAfter } from '../../validators/is-after.validator';

export class CreateShowtimeDto {
  @Type(() => Number)
  @IsPositive({ message: 'movieId phải là số dương' })
  @IsInt({ message: 'movieId phải là số nguyên' })
  @IsNumber({}, { message: 'movieId phải là số' })
  movieId: number;

  @Type(() => Number)
  @IsPositive({ message: 'theaterId phải là số dương' })
  @IsInt({ message: 'theaterId phải là số nguyên' })
  @IsNumber({}, { message: 'theaterId phải là số' })
  theaterId: number;

  @IsDateString({}, { message: 'startTime không đúng định dạng ISO 8601' })
  startTime: string;

  @IsAfter('startTime', { message: 'endTime phải sau startTime' })
  @IsDateString({}, { message: 'endTime không đúng định dạng ISO 8601' })
  endTime: string;

  @Type(() => Number)
  @Max(10_000_000, { message: 'Giá vé tối đa 10,000,000đ' })
  @Min(1_000, { message: 'Giá vé tối thiểu 1,000đ' })
  @IsNumber({}, { message: 'Giá vé phải là số' })
  price: number;
}
