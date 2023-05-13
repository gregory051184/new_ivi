import {Module} from '@nestjs/common';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ReviewController} from "./controllers/review.controller";
import {ReviewService} from "./services/review.service";
import {AdminService} from "./services/admin.service";
import {AdminController} from "./controllers/admin.controller";
import {
  CommonModule,
  Film, FilmActors,
  FilmCinematography, FilmDesigners,
  FilmDirectors,
  FilmEditors, FilmGenres,
  FilmMusicians, FilmProducers, FilmWriters,
  PostgresDBModule, RelatedFilms, Review
} from "@app/common";



@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, FilmDirectors, FilmEditors, FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers,
          FilmWriters, FilmActors, FilmGenres, Review, RelatedFilms]
    ),
    CommonModule.registerRmq({name: 'COUNTRY'}),
    CommonModule.registerRmq({name: 'AWARD'}),
    CommonModule.registerRmq({name: 'GENRE'}),
    CommonModule.registerRmq({name: 'PERSON'}),
  ],
  controllers: [FilmController, ReviewController, AdminController],
  providers: [FilmService, ReviewService, AdminService],
})
export class FilmModule {}
