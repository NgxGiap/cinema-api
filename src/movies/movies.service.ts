import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  // Dữ liệu tạm trong bộ nhớ — sẽ thay bằng DB ở Phase 3
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      description: 'Các siêu anh hùng tập hợp lần cuối',
      duration: 181,
      genre: 'Action',
      releaseDate: '2019-04-26',
      posterUrl: '',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Inception',
      description: 'Thế giới trong giấc mơ',
      duration: 148,
      genre: 'Sci-Fi',
      releaseDate: '2010-07-16',
      posterUrl: '',
      createdAt: new Date(),
    },
  ];

  private nextId = 3; // ID tự tăng

  // Lấy tất cả phim
  findAll(): Movie[] {
    return this.movies;
  }

  // Lấy 1 phim theo ID
  findOne(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) {
      throw new NotFoundException(`Không tìm thấy phim với ID ${id}`);
    }
    return movie;
  }

  // Tạo phim mới
  create(createMovieDto: CreateMovieDto): Movie {
    const newMovie: Movie = {
      id: this.nextId++,
      ...createMovieDto,
      createdAt: new Date(),
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  // Cập nhật phim
  update(id: number, updateMovieDto: UpdateMovieDto): Movie {
    const movie = this.findOne(id); // Tự throw lỗi nếu không tìm thấy
    const index = this.movies.findIndex((m) => m.id === id);
    this.movies[index] = { ...movie, ...updateMovieDto };
    return this.movies[index];
  }

  // Xoá phim
  remove(id: number): { message: string } {
    this.findOne(id); // Kiểm tra tồn tại trước
    this.movies = this.movies.filter((m) => m.id !== id);
    return { message: `Đã xoá phim ID ${id}` };
  }
}
