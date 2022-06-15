import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <Container>
      <Row>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, width: '30' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: "center", fontSize: "17px" }}>
                <Form className='login-border'>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Link to={'/register'}>
                    <Button className="loginButtons" variant="primary">
                      Register
                    </Button>
                  </Link>
                  <br></br> <br></br>
                </Form>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}