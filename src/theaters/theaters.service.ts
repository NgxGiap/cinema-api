import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from './entities/theater.entity';
import type { CreateTheaterDto } from './dto/create-theater.dto';
import type { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async findAll(): Promise<Theater[]> {
    return await this.theaterRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({ where: { id } });
    if (!theater) throw new NotFoundException(`Không tìm thấy rạp ID ${id}`);
    return theater;
  }

  async create(dto: CreateTheaterDto): Promise<Theater> {
    const theater = this.theaterRepository.create(dto);
    return await this.theaterRepository.save(theater);
  }

  async update(id: number, dto: UpdateTheaterDto): Promise<Theater> {
    const theater = await this.findOne(id);
    Object.assign(theater, dto);
    return await this.theaterRepository.save(theater);
  }

  async remove(id: number): Promise<{ message: string }> {
    const theater = await this.findOne(id);
    await this.theaterRepository.remove(theater);
    return { message: `Đã xoá rạp ID ${id}` };
  }
}
