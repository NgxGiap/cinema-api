import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import type { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // GET /movies?search=avengers&page=1&limit=10
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<{ data: Movie[]; meta: object }> {
    return this.moviesService.findAll(search, page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto): Promise<Movie> {
    return this.moviesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.moviesService.remove(id);
  }
}
