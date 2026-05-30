import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import type { Showtime } from './entities/showtime.entity';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  findAll(): Promise<Showtime[]> {
    return this.showtimesService.findAll();
  }

  @Get('by-movie/:movieId')
  findByMovie(@Param('movieId', ParseIntPipe) movieId: number): Promise<Showtime[]> {
    return this.showtimesService.findByMovie(movieId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Showtime> {
    return this.showtimesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateShowtimeDto): Promise<Showtime> {
    return this.showtimesService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShowtimeDto): Promise<Showtime> {
    return this.showtimesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.showtimesService.remove(id);
  }
}
