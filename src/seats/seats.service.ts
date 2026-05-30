import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import type { SeatStatus } from './entities/seat.entity';
import type { CreateSeatDto } from './dto/create-seat.dto';
import type { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async findAll(): Promise<Seat[]> {
    return await this.seatRepository.find();
  }

  async findByShowtime(showTimeId: number): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { showTimeId },
      order: { row: 'ASC', number: 'ASC' },
    });
  }

  async findAvailableByShowtime(showTimeId: number): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { showTimeId, status: 'available' },
      order: { row: 'ASC', number: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Seat> {
    const seat = await this.seatRepository.findOne({ where: { id } });
    if (!seat) throw new NotFoundException(`Không tìm thấy ghế ID ${id}`);
    return seat;
  }

  async create(dto: CreateSeatDto): Promise<Seat> {
    const seat = this.seatRepository.create(dto);
    return await this.seatRepository.save(seat);
  }

  async update(id: number, dto: UpdateSeatDto): Promise<Seat> {
    const seat = await this.findOne(id);
    Object.assign(seat, dto);
    return await this.seatRepository.save(seat);
  }

  // Dùng nội bộ khi booking — không expose ra controller
  async updateStatus(id: number, status: SeatStatus): Promise<Seat> {
    const seat = await this.findOne(id);
    seat.status = status;
    return await this.seatRepository.save(seat);
  }

  async remove(id: number): Promise<{ message: string }> {
    const seat = await this.findOne(id);
    await this.seatRepository.remove(seat);
    return { message: `Đã xoá ghế ID ${id}` };
  }
}
