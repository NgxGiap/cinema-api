import { Injectable, NotFoundException } from '@nestjs/common';
import type { Showtime } from './interfaces/showtime.interface';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimesService {
  private showtimes: Showtime[] = [
    {
      id: 1,
      movieId: 1,
      theaterId: 1,
      startTime: new Date('2026-05-10T10:00:00'),
      endTime: new Date('2026-05-10T13:01:00'),
      price: 85000,
      createdAt: new Date(),
    },
    {
      id: 2,
      movieId: 2,
      theaterId: 1,
      startTime: new Date('2026-05-10T14:00:00'),
      endTime: new Date('2026-05-10T16:28:00'),
      price: 75000,
      createdAt: new Date(),
    },
  ];

  private nextId = 3;

  findAll(): Showtime[] {
    return this.showtimes;
  }

  // Lấy suất chiếu theo movieId
  findByMovie(movieId: number): Showtime[] {
    return this.showtimes.filter((s) => s.movieId === movieId);
  }

  findOne(id: number): Showtime {
    const showtime = this.showtimes.find((s) => s.id === id);
    if (!showtime) throw new NotFoundException(`Không tìm thấy suất chiếu ID ${id}`);
    return showtime;
  }

  create(dto: CreateShowtimeDto): Showtime {
    const newShowtime: Showtime = {
      id: this.nextId++,
      ...dto,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      createdAt: new Date(),
    };
    this.showtimes.push(newShowtime);
    return newShowtime;
  }

  update(id: number, dto: UpdateShowtimeDto): Showtime {
    const showtime = this.findOne(id);

    const index = this.showtimes.findIndex((s) => s.id === id);

    this.showtimes[index] = {
      ...showtime,
      ...dto,

      startTime: dto.startTime ? new Date(dto.startTime) : showtime.startTime,

      endTime: dto.endTime ? new Date(dto.endTime) : showtime.endTime,
    };

    return this.showtimes[index];
  }

  remove(id: number): { message: string } {
    this.findOne(id);
    this.showtimes = this.showtimes.filter((s) => s.id !== id);
    return { message: `Đã xoá suất chiếu ID ${id}` };
  }
}
