export type SeatStatus = 'available' | 'booked' | 'reserved';

export class CreateSeatDto {
  showTimeId: number;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}
