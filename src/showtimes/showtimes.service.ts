import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from './entities/showtime.entity';
import type { CreateShowtimeDto } from './dto/create-showtime.dto';
import type { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
  ) {}

  async findAll(): Promise<Showtime[]> {
    return await this.showtimeRepository.find({
      relations: {
        movie: true,
        theater: true,
      }, // Join lấy thông tin phim + rạp
      order: { startTime: 'ASC' },
    });
  }

  async findByMovie(movieId: number): Promise<Showtime[]> {
    return await this.showtimeRepository.find({
      where: { movieId },
      relations: {
        theater: true,
      },
      order: { startTime: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Showtime> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id },
      relations: {
        movie: true,
        theater: true,
      },
    });
    if (!showtime) throw new NotFoundException(`Không tìm thấy suất chiếu ID ${id}`);
    return showtime;
  }

  async create(dto: CreateShowtimeDto): Promise<Showtime> {
    const showtime = this.showtimeRepository.create({
      ...dto,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
    });
    return await this.showtimeRepository.save(showtime);
  }

  async update(id: number, dto: UpdateShowtimeDto): Promise<Showtime> {
    const showtime = await this.findOne(id);
    Object.assign(showtime, dto);
    return await this.showtimeRepository.save(showtime);
  }

  async remove(id: number): Promise<{ message: string }> {
    const showtime = await this.findOne(id);
    await this.showtimeRepository.remove(showtime);
    return { message: `Đã xoá suất chiếu ID ${id}` };
  }
}
