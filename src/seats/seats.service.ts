import { Injectable, NotFoundException } from '@nestjs/common';
import type { Seat, SeatStatus } from './interfaces/seat.interface';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatsService {
  private seats: Seat[] = [
    { id: 1, showTimeId: 1, row: 'A', number: 1, status: 'available', price: 85000 },
    { id: 2, showTimeId: 1, row: 'A', number: 2, status: 'available', price: 85000 },
    { id: 3, showTimeId: 1, row: 'A', number: 3, status: 'booked', price: 85000 },
    { id: 4, showTimeId: 1, row: 'B', number: 1, status: 'available', price: 95000 },
    { id: 5, showTimeId: 1, row: 'B', number: 2, status: 'reserved', price: 95000 },
    { id: 6, showTimeId: 2, row: 'A', number: 1, status: 'available', price: 75000 },
    { id: 7, showTimeId: 2, row: 'A', number: 2, status: 'available', price: 75000 },
  ];

  private nextId = 8;

  // Lấy tất cả ghế
  findAll(): Seat[] {
    return this.seats;
  }

  // Lấy ghế theo suất chiếu — dùng khi hiển thị sơ đồ ghế
  findByShowtime(showTimeId: number): Seat[] {
    return this.seats.filter((s) => s.showTimeId === showTimeId);
  }

  // Lấy ghế còn trống theo suất chiếu
  findAvailableByShowtime(showTimeId: number): Seat[] {
    return this.seats.filter((s) => s.showTimeId === showTimeId && s.status === 'available');
  }

  findOne(id: number): Seat {
    const seat = this.seats.find((s) => s.id === id);
    if (!seat) throw new NotFoundException(`Không tìm thấy ghế ID ${id}`);
    return seat;
  }

  create(dto: CreateSeatDto): Seat {
    const newSeat: Seat = {
      id: this.nextId++,
      ...dto,
      status: 'available',
    };
    this.seats.push(newSeat);
    return newSeat;
  }

  update(id: number, dto: UpdateSeatDto): Seat {
    const seat = this.findOne(id);
    const index = this.seats.findIndex((s) => s.id === id);
    this.seats[index] = { ...seat, ...dto };
    return this.seats[index];
  }

  // Dùng nội bộ khi đặt vé — đổi trạng thái ghế
  updateStatus(id: number, status: SeatStatus): Seat {
    const seat = this.findOne(id);
    const index = this.seats.findIndex((s) => s.id === id);
    this.seats[index] = { ...seat, status };
    return this.seats[index];
  }

  remove(id: number): { message: string } {
    this.findOne(id);
    this.seats = this.seats.filter((s) => s.id !== id);
    return { message: `Đã xoá ghế ID ${id}` };
  }
}
