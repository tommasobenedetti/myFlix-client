import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import FavoriteMovies from '../profile-view/favorite-movies';

export default class MovieView extends React.Component {


  addToFavoriteList(movieId) {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.post(`https://quiet-savannah-08380.herokuapp.com/users/${Username}/${movieId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log(response.data)
        alert(`The movie was successfully add to your list.`)
      }).
      catch(error => console.error(error))
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
            <Card className="text-center">
              <div className="movie-view">
                <br></br>
                <div className="movie-title">
                  <span className="label">Title: </span>
                  <span className="value">{movie.Title}</span>
                  <br></br>
                  <br></br>
                </div>
                <div className="movie-poster">
                  <img src={movie.ImagePath} />
                </div>
                <br></br>
                <div className="movie-description">
                  <span className="label">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>
                <br></br>
                <div className="movie-genre">
                  <span className="label">Genre: </span>
                  <br></br>
                  <Link to={`/genre/${movie.Genre.Name}`}>
                    <Button variant="light">{movie.Genre.Name}</Button>
                  </Link>
                </div>
                <br></br>
                <div className="movie-director">
                  <span className="label">Director: </span>
                  <br></br>
                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="light">{movie.Director.Name}</Button>
                </Link>

              </div>
              <br></br>

              <Button variant="outline-dark" onClick={() => this.addToFavoriteList(movie._id)}>Add to Favorites</Button>
              <Button variant="outline-dark" onClick={() => onBackClick(null)}>Back</Button>
              <br></br>  <br></br> <br></br>  <br></br>
            </Card>
          </Col>

        </Row>
      </Container>

    );
  }
} 