import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!Username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (Username.length < 8) {
      setUsernameErr('Username must be 8 characters long');
      isReq = false;
    }
    if (!Password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (Password.length < 8) {
      setPassword('Password must be 8 characters long');
      isReq = false;
    }

    return isReq;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // props.onLoggedIn(username);
    const isReq = validate();
    console.log(isReq)
    if (isReq) {
      axios.post('https://quiet-savannah-08380.herokuapp.com/login', {
        Username: Username,
        Password: Password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user')
        });
    };

  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <br></br><br></br>
        <Form.Label className="loginForm">Username: </Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <br></br>
      <Form.Group controlId="formPassword">
        <Form.Label className="loginForm">Password: </Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>
      <br></br>

      <Link to={'/register'}>
        <Button className="loginButtons" variant="primary">
          Register
        </Button>
      </Link>
      <br></br> <br></br>
    </Form>
  );
}


LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};