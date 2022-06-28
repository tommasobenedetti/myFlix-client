import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import LoginView from "../login-view/login-view";
import MovieView from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import RegistrationView from '../registration-view/registration-view';
import { Link } from 'react-router-dom';
import { Navbar, Button, Col, Row } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*code executed right after the component is added to the DOM.*/
  getMovies(token) {
    axios.get("https://quiet-savannah-08380.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {


        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // This will update the 'user' property in state to that user when successfully login in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    })


    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  /*Log out function*/
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.location.href = '/'

  }



  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Navbar bg="secondary" expand="lg" className="navbar1" sticky="top">
          <Navbar.Brand className="navbar2">
            <Link style={{ color: "white" }} to={'/'}>

            </Link>
          </Navbar.Brand>
          {user && (
            <Navbar.Collapse className="justify-content-end">
              <Link to={`/users/${this.state.user}`} className="mr-2">
                <br></br><br></br>
                <Button variant="light" style={{ color: "white" }}>{user}'s Profile</Button>
              </Link>
              <br></br>
              <Button className="logout" onClick={() => this.onLoggedOut()} variant="light" style={{ color: "white" }}>Logout</Button>
              <br></br>
            </Navbar.Collapse>
          )}
        </Navbar>

        <Row >

          <Route exact path="/" render={() => {

            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;

            return <MoviesList movies={movies} />

          }} />

          <Route path="/login" render={() => {
            if (user) {
              return <Redirect to="/" />;
            }
            return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (<Col>
              <RegistrationView />
            </Col>
            )
          }} />

          <Route path="/users/:Username" render={({ history }) => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (

              <Col>
                <ProfileView
                  user={this.state.user}
                  movies={movies}
                  onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;
            return (<Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
            )
          }
          } />

          <Route path="/genre/:name" render={({ match, history }) => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);