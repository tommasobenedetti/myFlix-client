import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
      Username: null,
      Password: null,
      Email: null,
      FavoriteMovies: [],
    };

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://quiet-savannah-08380.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        // Store the details in the appropriate state variables (separating the FavoriteMovies array for ease of use)
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        FavoriteMovies: response.data.FavoriteMovies,
      });
    }).catch(function (error) {
      console.log(error);
    });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://quiet-savannah-08380.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
        });

        localStorage.setItem('user', this.state.Username);
        alert("Profile updated");
        window.open('/users/:Username', '_self');
      });
  };

  onRemoveFavorite = (e, movies) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://quiet-savannah-08380.herokuapp.com/users/${Username}/FavoriteMovies/${movies._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://quiet-savannah-08380.herokuapp.com/users/${Username}/movies/${movie._id}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = "/";

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  deleteUser() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const Username = localStorage.getItem("user");
      axios.delete(`https://quiet-savannah-08380.herokuapp.com/users/${Username}`,
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
    const { FavoriteMovies, Username, Email, Birthday } = this.state;
    let FavoriteMoviesArray = [];


    return (
      <Container>
        <Row>
          <Col>
            <Card bg="secondary" text="light" border="light">
              <Card.Body>


                <Card.Title className="text-center">About {this.state.Username}</Card.Title>


                {this.state.Email && (
                  <Card.Text><span className="profile_heading">Email: </span>{this.state.Email}</Card.Text>
                )}

                {this.state.Birthday && (
                  <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(this.state.Birthday))}</Card.Text>
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

                    <Form.Control name="Username" type="text" onChange={(e) => this.setUsername(e.target.value)} required />

                    <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="updateFormPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name="Password" type="password" onChange={(e) => this.setPassword(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="updateFormEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control name="email" type="email" onChange={(e) => this.setEmail(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="updateDateOfBirth">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control name="Birthdate" type="date" onChange={(e) => this.setBirthday(e.target.value)} />
                  </Form.Group>

                  <br></br>
                  <div>
                    <Button variant="success" type="submit" onClick={this.editUser}>Update Data</Button>
                    <Button variant="secondary" onClick={() => this.onDeleteUser()}>Delete Profile</Button>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card bg="secondary" text="light" border="light" align="center" style={{ color: "white" }}>

              <Card.Body>
                <Card.Title className="text-center"> Favorite Movies of {this.state.Username}
                </Card.Title>
                {FavoriteMovies.length === 0 && (
                  <div className="text-center">No favorite movies</div>
                )}
                <Row className="favorite-movies-container">
                  {FavoriteMovies.length > 0 && movies.map((movie) => {
                    if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Card className="favorite-movie" key={movie._id} >
                          <Card.Img
                            className="favorite-movie-image"
                            variant="top"
                            src={movie.ImagePath}
                          />
                          <Card.Body>
                            <Card.Title className="movie-title">
                              {movie.Title}
                            </Card.Title>
                            <Button value={movies._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove from List</Button>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
        </Row>
      </Container>
    )
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

