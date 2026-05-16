import { IsNumber, IsPositive, IsString, IsIn, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSeatDto {
  @Type(() => Number)
  @IsPositive({ message: 'showTimeId phải là số dương' })
  @IsInt({ message: 'showTimeId phải là số nguyên' })
  @IsNumber({}, { message: 'showTimeId phải là số' })
  showTimeId: number;

  @IsString({ message: 'Hàng ghế phải là chuỗi ký tự' })
  @IsIn(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], {
    message: 'Hàng ghế không hợp lệ, chỉ chấp nhận A-H',
  })
  row: string;

  @Type(() => Number)
  @Max(30, { message: 'Số ghế tối đa 30' })
  @Min(1, { message: 'Số ghế tối thiểu 1' })
  @IsInt({ message: 'Số ghế phải là số nguyên' })
  @IsNumber({}, { message: 'Số ghế phải là số' })
  number: number;

  @Type(() => Number)
  @Max(10_000_000, { message: 'Giá ghế tối đa 10,000,000đ' })
  @Min(1_000, { message: 'Giá ghế tối thiểu 1,000đ' })
  @IsNumber({}, { message: 'Giá ghế phải là số' })
  price: number;
}
