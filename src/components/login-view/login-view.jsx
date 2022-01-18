import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://quiet-savannah-08380.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then((response) => {

        if (response.status == 200) {
          localStorage.setItem('token', response.data.token);
          props.onLoggedIn(response.data.token);
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
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <a href="">create account</a>
    </Form>
  );
}
