import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies'
import { MovieCard } from '../movie-card/movie-card';
import UpdateUser from './update-user'
import UserInfo from './user-info'





export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
      username: null,
      password: null,
      email: null,
      FavoriteMovies: [],
    };

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://quiet-savannah-08380.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        // Store the details in the appropriate state variables (separating the FavoriteMovies array for ease of use)
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        FavoriteMovies: response.data.FavoriteMovies,
      });
    }).catch(function (error) {
      console.log(error);
    });
  };

  editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://quiet-savannah-08380.herokuapp.com/users/${username}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
        });

        localStorage.setItem('user', this.state.username);
        alert("Profile updated");
        window.open('/profile', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://quiet-savannah-08380.herokuapp.com/user/favorites/delete/${user}/movies/${movies._id}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        alert('Favorite was removed')
        window.location.reload();



      })
      .catch(function (error) {
        console.log(error);
      })
  }
  deleteUser() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios.delete(`https://quiet-savannah-08380.herokuapp.com/user/delete/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + " has been deleted.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        })
    };

  }

  setUsername(value) {
    this.setState({
      username: value,
    });
  }



  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, username, email, birthday } = this.state;
    let FavoriteMoviesArray = [];

    if (!username) {
      return null;
    }

    return (
      <div className="profile_view">

        <Button variant="secondary" onClick={this.closeModal}>
          Cancel
        </Button>
        <br></br>
        <Button variant="danger" onClick={this.deleteUserDetails}>
          Delete Profile
        </Button>


        <Card bg="secondary" text="light" border="light">
          <Card.Body>


            <Card.Title className="text-center">Profile of {this.state.userDetails.username}</Card.Title>
            <Card.Text><span className="profile_heading"></span>{this.state.userDetails.username}</Card.Text>

            {this.state.userDetails.Birthdate && (
              <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(this.state.userDetails.birthday))}</Card.Text>
            )}
          </Card.Body>
        </Card>

        <Card bg="secondary" text="light" border="light">
          <Card.Body>
            <Card.Title className="text-center">Update Profile Details</Card.Title>
            <br></br>
            <Form noValidate validated={this.state.validated}>

              <Form.Group controlId="updateFormUsername">
                <Form.Label>Username:</Form.Label>

                <Form.Control name="Username" type="text" onChange={this.handleFieldChange} required />

                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="updateFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control name="Password" type="password" onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control name="email" type="email" onChange={this.handleFieldChange} required />
                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="updateDateOfBirth">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control name="Birthdate" type="date" onChange={this.handleFieldChange} />
              </Form.Group>

              <br></br>
              <Button variant="light" style={{ color: "white" }} type="submit" onClick={this.updateUserDetails}>
                Update Details
              </Button>

              <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>


            </Form>
          </Card.Body>
        </Card>

        <Card bg="secondary" text="light" border="light" align="center" style={{ color: "white" }}>
          <Card.Title>{this.state.userDetails.username}'s Favorites:</Card.Title>
          <Row>

            {FavoriteMoviesArray.map(movie => (
              <Col md={4} key={movie._id} className="my-2">
                <MovieCard movie={movie} />
              </Col>))}
          </Row>
        </Card>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      ImagePath: PropTypes.string,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birthyear: PropTypes.string,
        Deathyear: PropTypes.string
      }),
    })
  ),
  onBackClick: PropTypes.func.isRequired
};