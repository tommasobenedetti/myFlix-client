import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
     <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
   );
 }
}

MovieCard.propTypes = {
 movie: PropTypes.shape({
   Title: PropTypes.string.isRequired,
   Description: PropTypes.string.isRequired,
   ImagePath: PropTypes.string.isRequired,
   Actors: PropTypes.string.isRequired,
   Director: PropTypes.shape({
     Name:PropTypes.string.isRequired
   }),
   Genre: PropTypes.shape({
     Name:PropTypes.string.isRequired
   })
 }).isRequired,
 onMovieClick: PropTypes.func.isRequired
}; 
