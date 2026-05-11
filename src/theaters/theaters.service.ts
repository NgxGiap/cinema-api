import { Injectable, NotFoundException } from '@nestjs/common';
import type { Theater } from './interfaces/theater.interface';
import type { CreateTheaterDto } from './dto/create-theater.dto';
import type { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheatersService {
  private theaters: Theater[] = [
    {
      id: 1,
      name: 'CGV Vincom',
      address: '191 Bà Triệu, Hà Nội',
      totalRooms: 8,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Lotte Cinema',
      address: '54 Liễu Giai, Hà Nội',
      totalRooms: 6,
      createdAt: new Date(),
    },
  ];

  private nextId = 3;

  findAll(): Theater[] {
    return this.theaters;
  }

  findOne(id: number): Theater {
    const theater = this.theaters.find((t) => t.id === id);
    if (!theater) throw new NotFoundException(`Không tìm thấy rạp ID ${id}`);
    return theater;
  }

  create(dto: CreateTheaterDto): Theater {
    const newTheater: Theater = { id: this.nextId++, ...dto, createdAt: new Date() };
    this.theaters.push(newTheater);
    return newTheater;
  }

  update(id: number, dto: UpdateTheaterDto): Theater {
    const theater = this.findOne(id);
    const index = this.theaters.findIndex((t) => t.id === id);
    this.theaters[index] = { ...theater, ...dto };
    return this.theaters[index];
  }

  remove(id: number): { message: string } {
    this.findOne(id);
    this.theaters = this.theaters.filter((t) => t.id !== id);
    return { message: `Đã xoá rạp ID ${id}` };
  }
}
