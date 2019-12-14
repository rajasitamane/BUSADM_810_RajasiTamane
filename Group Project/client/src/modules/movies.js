import { inject } from 'aurelia-framework';
import { Movie } from '../resources/data/movie-object';

@inject(Movie)
export class Movies {
  constructor(Movie) {
    this.Movie = Movie;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.statuses = ['Never Watched','In Process', 'Completed'];
    this.isCheckedCompleted = true;
    this.showForm = false;
  }

  async attached() {
    await this.getMovies();
  }
  async getMovies() {
    await this.Movie.getMovies(this.userObj._id);
    this.showForm = false;
  }

  updateMovie(Movie) {
    this.Movie.selectedMovie = Movie;
    this.saveMovie();
  }



  newMovie() {
    this.Movie.newMovie(this.userObj._id);
    this.showForm = true;
  }

  editMovie(Movie) {
    this.Movie.selectedMovie = Movie;
    this.showForm = true;
  }

  async saveMovie() {
   console.log(this.Movie.selectedMovie)
    await this.Movie.saveMovie()
    this.getMovies();
  }

  async deleteMovies() {
    await this.Movie.deleteMovies(this.Movie._id);
    this.getMovies();
  }

  Cancel() {
    this.showForm = false;
  }

  updateMovie(Movie) {
    this.Movie.selectedMovie = Movie;
    this.saveMovie();
  }
  async deleteMovie(Movie) {
    await this.Movie.deleteMovie(Movie._id);
    this.getMovies();
  }

}

