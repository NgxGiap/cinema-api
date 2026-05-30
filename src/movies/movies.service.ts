import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Movie } from './entities/movie.entity';
import type { CreateMovieDto } from './dto/create-movie.dto';
import type { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  // Lấy tất cả phim — có search + pagination
  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Movie[]; meta: { total: number; page: number; lastPage: number } }> {
    const where = search ? { title: Like(`%${search}%`) } : {};

    const [data, total] = await this.movieRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException(`Không tìm thấy phim với ID ${id}`);
    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(dto);
    return await this.movieRepository.save(movie);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    Object.assign(movie, dto);
    return await this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<{ message: string }> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
    return { message: `Đã xoá phim ID ${id}` };
  }
}
