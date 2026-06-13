import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import type { Showtime } from './entities/showtime.entity';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Public() // Ai cũng xem được danh sách suất chiếu
  @Get()
  findAll(): Promise<Showtime[]> {
    return this.showtimesService.findAll();
  }

  @Public() // Ai cũng xem được suất chiếu theo phim
  @Get('by-movie/:movieId')
  findByMovie(@Param('movieId', ParseIntPipe) movieId: number): Promise<Showtime[]> {
    return this.showtimesService.findByMovie(movieId);
  }

  @Public() // Ai cũng xem được chi tiết suất chiếu
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Showtime> {
    return this.showtimesService.findOne(id);
  }

  @Roles('admin') // Chỉ admin mới tạo suất chiếu
  @Post()
  create(@Body() dto: CreateShowtimeDto): Promise<Showtime> {
    return this.showtimesService.create(dto);
  }

  @Roles('admin') // Chỉ admin mới sửa suất chiếu
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShowtimeDto): Promise<Showtime> {
    return this.showtimesService.update(id, dto);
  }

  @Roles('admin') // Chỉ admin mới xoá suất chiếu
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.showtimesService.remove(id);
  }
}
