import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('theaters')
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  address: string;

  @Column()
  totalRooms: number;

  @CreateDateColumn()
  createdAt: Date;
}
