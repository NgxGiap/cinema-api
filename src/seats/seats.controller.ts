import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import type { Seat } from './interfaces/seat.interface';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  // GET /seats
  @Get()
  findAll(): Seat[] {
    return this.seatsService.findAll();
  }

  // GET /seats/by-showtime/1 — sơ đồ ghế theo suất chiếu
  @Get('by-showtime/:showTimeId')
  findByShowtime(@Param('showTimeId', ParseIntPipe) showTimeId: number): Seat[] {
    return this.seatsService.findByShowtime(showTimeId);
  }

  // GET /seats/available/1 — ghế còn trống theo suất chiếu
  @Get('available/:showTimeId')
  findAvailable(@Param('showTimeId', ParseIntPipe) showTimeId: number): Seat[] {
    return this.seatsService.findAvailableByShowtime(showTimeId);
  }

  // GET /seats/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Seat {
    return this.seatsService.findOne(id);
  }

  // POST /seats
  @Post()
  create(@Body() createSeatDto: CreateSeatDto): Seat {
    return this.seatsService.create(createSeatDto);
  }

  // PUT /seats/1
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSeatDto: UpdateSeatDto): Seat {
    return this.seatsService.update(id, updateSeatDto);
  }

  // DELETE /seats/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.seatsService.remove(id);
  }
}
