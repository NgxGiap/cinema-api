import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Theater } from '../../theaters/entities/theater.entity';

@Entity('showtimes')
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: number;

  @Column()
  theaterId: number;

  @ManyToOne(() => Movie, { eager: false })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @ManyToOne(() => Theater, { eager: false })
  @JoinColumn({ name: 'theaterId' })
  theater: Theater;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column('decimal', { precision: 10, scale: 0 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
