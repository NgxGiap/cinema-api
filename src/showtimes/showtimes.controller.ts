import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import type { Showtime } from './interfaces/showtime.interface';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  findAll(): Showtime[] {
    return this.showtimesService.findAll();
  }

  @Get('by-movie/:movieId')
  findByMovie(@Param('movieId', ParseIntPipe) movieId: number): Showtime[] {
    return this.showtimesService.findByMovie(movieId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Showtime {
    return this.showtimesService.findOne(id);
  }

  @Post()
  create(@Body() createShowtimeDto: CreateShowtimeDto): Showtime {
    return this.showtimesService.create(createShowtimeDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShowtimeDto: UpdateShowtimeDto,
  ): Showtime {
    return this.showtimesService.update(id, updateShowtimeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.showtimesService.remove(id);
  }
}
