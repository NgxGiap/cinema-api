import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTheaterDto {
  @IsString({ message: 'Tên rạp phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên rạp không được để trống' })
  @MinLength(2, { message: 'Tên rạp tối thiểu 2 ký tự' })
  @MaxLength(100, { message: 'Tên rạp tối đa 100 ký tự' })
  name: string;

  @IsString({ message: 'Địa chỉ phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @MinLength(5, { message: 'Địa chỉ tối thiểu 5 ký tự' })
  address: string;

  @Type(() => Number)
  @Max(20, { message: 'Số phòng chiếu tối đa 20 phòng' })
  @Min(1, { message: 'Số phòng chiếu tối thiểu 1 phòng' })
  @IsInt({ message: 'Số phòng chiếu phải là số nguyên' })
  @IsNumber({}, { message: 'Số phòng chiếu phải là số' })
  totalRooms: number;
}
