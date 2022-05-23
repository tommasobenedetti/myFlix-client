import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link, Router } from 'react-router-dom';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';

export function RegistrationView(props) {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');

    const [UsernameErr, setUsernameErr] = useState('');
    const [PasswordErr, setPasswordErr] = useState('');
    const [emailErr, setemailErr] = useState('');

    const validate = () => {

        let isReq = true;
        if (!Username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (Username.length < 6) {
            setUsernameErr('Username must be 6 characters long');
            isReq = false;
        }
        if (!Password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (Password.length < 8) {
            setPasswordErr('Password must be 8 characters long');
            isReq = false;
        }
        if (!Email) {
            setemailErr('Please enter a valid email')
        } else if (Email.indexOf('@') === -1) {
            setemailErr('Please enter a valid email')
            isReq = false;
        }
        return isReq;

    }

    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = validate();
        console.log(Username, Password)
        if (isReq) {
            axios.post('https://quiet-savannah-08380.herokuapp.com/users', {
                Username: Username,
                password: Password,
                Email: Email
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Successful registration, please login');
                    props.history.push('/');

                })
                .catch(response => {
                    console.error('response');
                    alert('unable to register');
                });
        }
    };

    return (
        <div className="registration-view">
            <Container fluid style={{ paddingTop: '0.75rem' }}>
                <Row>
                    <Col>
                        <CardGroup>
                            <Card bg="secondary" text="white" border="light">
                                <Card.Body>
                                    <Card.Title>Register</Card.Title>
                                    <Form>
                                        <br></br>
                                        <Form.Group>
                                            <Form.Label> Username: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={Username}
                                                onChange={e => setUsername(e.target.value)}
                                                required
                                                placeholder="Enter a username" />
                                            {UsernameErr && <p>{UsernameErr}</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={Password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                minLength="5"
                                                placeholder="Your password must be at least 5 characters" />
                                            {PasswordErr && <p>{PasswordErr}</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={Email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                placeholder="Enter your email" />
                                            {emailErr && <p>{emailErr}</p>}
                                        </Form.Group>
                                        <br></br>
                                        <Button variant="light" style={{ color: "white" }} type="submit"
                                            onClick={handleRegister}>
                                            Register
                                        </Button>
                                        <br></br>

                                        <Link to='/'>
                                            <Button variant="link" className="d-flex mx-auto">
                                                Back to Login
                                            </Button>
                                        </Link>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}