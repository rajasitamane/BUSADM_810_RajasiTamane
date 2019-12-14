import {inject} from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class Movie {
    constructor(data) {
        this.data = data;
        this.Movie_SERVICE = 'Movies';
    }
    newMovie(id) {
        this.selectedMovie = {};
        this.selectedMovie.Movie = "";
        this.selectedMovie.Moviedetail = "";
        this.selectedMovie.dateWatched = new Date();
      this.selectedMovie.datePlanned = new Date();
      this.selectedMovie.status = "Never Watched";
        this.selectedMovie.userid = id;
    }
    async saveMovie() {
        let serverResponse;
        if (this.selectedMovie) {
            if (this.selectedMovie._id) {
                let url = this.Movie_SERVICE + "/" + this.selectedMovie._id;
                serverResponse = await this.data.put(this.selectedMovie, url);
            } else {
                serverResponse = await this.data.post(this.selectedMovie, this.Movie_SERVICE);
            }
            return serverResponse;
        }
    }
    async getMovies(userid) {
            let url = this.Movie_SERVICE + '/user/' + userid;
            let response = await this.data.get(url);
            if (!response.error) {
              this.MoviesArray = response;
            } else {
              this.MoviesArray = [];
            }
        console.log(this.MoviesArray);
          }

        async deleteMovie(id){
            let url = this.Movie_SERVICE + '/' + id;
            await this.data.delete(url);
        }
        

}
