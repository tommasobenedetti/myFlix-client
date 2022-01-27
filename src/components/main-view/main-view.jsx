import React from 'react';
import axios from 'axios';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect, Link, Routes } from "react-router-dom";

import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import RegistrationView from '../registration-view/registration-view';


class MainView extends React.Component {
  constructor() {
    super();
    //Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState(
        {
          user: token
        },
        () => {
          this.getMovies();
        }
      );
    }
  }

  /*code executed right after the component is added to the DOM.*/
  getMovies() {
    axios.get('https://quiet-savannah-08380.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${this.state.user}` }
    })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /*code executed right after the component is added to the DOM.*/

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in,
  this function updates the `user` property
  in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /*Log our function*/
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null });
  }

  render() {
    const { favoriteMovies } = this.state;
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Routes>
          <Route exact path="/" render={() => {
            if (!user) return (<Row>
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            </Row>)
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

             /*registration page*/
          <Route path='/users' render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          {/*profile page to change info*/}
          <Route path='/users/:ID' render={({ history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={12}>
              <ProfileView user={user} setUser={user => this.setUser(user)}
                movies={movies} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}
              />
            </Col>
          }} />

          {/*specific movie*/}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/*specific genre*/}
          <Route path="/movies/genre/:name" render={({ match }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          {/*specific director*/}
          <Route path="/movies/directors/:name" render={({ match }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Routes>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);