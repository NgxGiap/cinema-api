import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import type { Seat } from './interfaces/seat.interface';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  // GET /seats
  @Public() // Ai cũng xem được danh sách ghế
  @Get()
  findAll(): Promise<Seat[]> {
    return this.seatsService.findAll();
  }

  // GET /seats/by-showtime/1 — sơ đồ ghế theo suất chiếu
  @Public() // Ai cũng xem được sơ đồ ghế theo suất chiếu
  @Get('by-showtime/:showTimeId')
  findByShowtime(@Param('showTimeId', ParseIntPipe) showTimeId: number): Promise<Seat[]> {
    return this.seatsService.findByShowtime(showTimeId);
  }

  // GET /seats/available/1 — ghế còn trống theo suất chiếu
  @Public() // Ai cũng xem được ghế còn trống theo suất chiếu
  @Get('available/:showTimeId')
  findAvailable(@Param('showTimeId', ParseIntPipe) showTimeId: number): Promise<Seat[]> {
    return this.seatsService.findAvailableByShowtime(showTimeId);
  }

  // GET /seats/1
  @Public() // Ai cũng xem được chi tiết ghế
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Seat> {
    return this.seatsService.findOne(id);
  }

  // POST /seats
  @Roles('admin') // Chỉ admin mới tạo ghế
  @Post()
  create(@Body() createSeatDto: CreateSeatDto): Promise<Seat> {
    return this.seatsService.create(createSeatDto);
  }

  // PUT /seats/1
  @Roles('admin') // Chỉ admin mới sửa ghế
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeatDto: UpdateSeatDto,
  ): Promise<Seat> {
    return this.seatsService.update(id, updateSeatDto);
  }

  // DELETE /seats/1
  @Roles('admin') // Chỉ admin mới xoá ghế
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.seatsService.remove(id);
  }
}
