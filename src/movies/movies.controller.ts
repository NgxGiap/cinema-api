import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import type { Movie } from './interfaces/movie.interface';

@Controller('movies') // Tất cả route bắt đầu bằng /movies
export class MoviesController {
  // NestJS tự inject MoviesService vào đây — đây là Dependency Injection
  constructor(private readonly moviesService: MoviesService) {}

  // GET /movies
  @Get()
  findAll(): Movie[] {
    return this.moviesService.findAll();
  }

  // GET /movies/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Movie {
    return this.moviesService.findOne(id);
  }

  // POST /movies
  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Movie {
    return this.moviesService.create(createMovieDto);
  }

  // PUT /movies/1
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto): Movie {
    return this.moviesService.update(id, updateMovieDto);
  }

  // DELETE /movies/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.moviesService.remove(id);
  }
}
