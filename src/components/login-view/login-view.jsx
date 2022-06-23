import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');



  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 8) {
      setUsernameErr('Username must be 8 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be 8 characters long');
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
        Username: username,
        Password: password
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
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>
      <br></br>
      <Form.Group controlId="formPassword">
        <Form.Label className="loginForm">Password: </Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
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