import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <br></br>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
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
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="light">{movie.Director.Name}</Button>
                </Link>
              </div>
              <br></br>
              <Button variant="outline-dark" onClick={() => onBackClick(null)}>Back</Button>
              <br></br>  <br></br> <br></br>  <br></br>
            </div>

          </Col>

        </Row>
      </Container>

    );
  }
} 