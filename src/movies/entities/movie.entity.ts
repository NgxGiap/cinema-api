import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Showtime } from '../../showtimes/entities/showtime.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  duration: number;

  @Column({ length: 50 })
  genre: string;

  @Column()
  releaseDate: string;

  @Column({ nullable: true })
  posterUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[];
}
