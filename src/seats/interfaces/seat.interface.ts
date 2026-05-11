export type SeatStatus = 'available' | 'booked' | 'reserved';

export interface Seat {
  id: number;
  showTimeId: number;
  row: string; // A, B, C...
  number: number; // 1, 2, 3...
  status: SeatStatus;
  price: number;
}
