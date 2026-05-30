import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Showtime } from '../../showtimes/entities/showtime.entity';

export type SeatStatus = 'available' | 'booked' | 'reserved';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  showTimeId: number;

  @ManyToOne(() => Showtime, { eager: false })
  @JoinColumn({ name: 'showTimeId' })
  showtime: Showtime;

  @Column({ length: 5 })
  row: string;

  @Column()
  number: number;

  @Column({
    type: 'enum',
    enum: ['available', 'booked', 'reserved'],
    default: 'available',
  })
  status: SeatStatus;

  @Column('decimal', { precision: 10, scale: 0 })
  price: number;
}
