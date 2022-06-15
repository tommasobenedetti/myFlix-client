import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://quiet-savannah-08380.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          props.onLoggedIn(response.data);
        } else if (response.status == 400) {
          // wrong password or username
        } else {
          // a different status code was sent
        }
      });
  };
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
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};