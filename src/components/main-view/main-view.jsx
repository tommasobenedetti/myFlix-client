import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import inception from '/img/inception.jpg'
import shawshank from '/img/shawshank.jpg'
import gladiator from '/img/gladiator.jpg'

let imgPath = './img';

export default class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      //movies: [
      //  { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', ImagePath: inception, Genre:'Action, Adventure, Sci-fi', Director:'Christopher Nolan'},
      //  { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ImagePath: shawshank, Genre:'Drama', Director:'Frank Darabont'},
      //  { _id: 3, Title: "Gladiator", Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', ImagePath: gladiator, Genre:'Adventure, Action, Drama', Director:'Ridley Scott'}
      //],
      selectedMovie: null
    }
  }

  componentDidMount(){
     axios.get('https://quiet-savannah-08380.herokuapp.com/movies')
       .then(response => {
         this.setState({
           movies: response.data
         });
       })
       .catch(error => {
         console.log(error);
       });
   }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
        <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
        }
      </div>
    );
  }
}
