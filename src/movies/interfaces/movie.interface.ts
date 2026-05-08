export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number; // phút
  genre: string;
  releaseDate: string;
  posterUrl: string;
  createdAt: Date;
}
