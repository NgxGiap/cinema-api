import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString({ message: 'Tên phim phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên phim không được để trống' })
  @MinLength(2, { message: 'Tên phim tối thiểu 2 ký tự' })
  @MaxLength(200, { message: 'Tên phim tối đa 200 ký tự' })
  title: string;

  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @MinLength(10, { message: 'Mô tả tối thiểu 10 ký tự' })
  description: string;

  @Type(() => Number)
  @Max(600, { message: 'Thời lượng tối đa 600 phút' })
  @Min(1, { message: 'Thời lượng tối thiểu 1 phút' })
  @IsInt({ message: 'Thời lượng phải là số nguyên' })
  @IsNumber({}, { message: 'Thời lượng phải là số' })
  duration: number;

  @IsString({ message: 'Thể loại phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Thể loại không được để trống' })
  genre: string;

  @IsDateString({}, { message: 'Ngày phát hành không đúng định dạng YYYY-MM-DD' })
  releaseDate: string;

  @IsOptional()
  @IsString({ message: 'URL poster phải là chuỗi ký tự' })
  posterUrl?: string;
}
