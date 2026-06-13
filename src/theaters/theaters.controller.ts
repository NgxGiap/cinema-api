import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import type { Theater } from './interfaces/theater.interface';
import { TheatersService } from './theaters.service';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Public() // Ai cũng xem được danh sách rạp
  @Get()
  findAll(): Promise<Theater[]> {
    return this.theatersService.findAll();
  }

  @Public() // Ai cũng xem được chi tiết rạp
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Theater> {
    return this.theatersService.findOne(id);
  }

  @Roles('admin') // Chỉ admin mới tạo rạp
  @Post()
  create(@Body() createTheaterDto: CreateTheaterDto): Promise<Theater> {
    return this.theatersService.create(createTheaterDto);
  }

  @Roles('admin') // Chỉ admin mới sửa rạp
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTheaterDto: UpdateTheaterDto,
  ): Promise<Theater> {
    return this.theatersService.update(id, updateTheaterDto);
  }

  @Roles('admin') // Chỉ admin mới xoá rạp
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.theatersService.remove(id);
  }
}
