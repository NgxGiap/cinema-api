import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [MoviesModule, TheatersModule, ShowtimesModule, SeatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
