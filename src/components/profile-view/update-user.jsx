import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';



const UpdateUser = ({ user }) => {
    const [userData, setUserData] = React.useState({
        username: `${user.username}`,
        password: '',
        email: `${user.email}`
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = e => {
        const { name, value } = e.target;
        let error = validate(name, value);
        setErrors((prevErr) => {
            return {
                ...prevErr,
                ...error
            }
        });

        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();

        //form can be submitted if there are no validation errors. 
        let isValid = Object.values(errors).every(error => error.length === 0);
        const token = localStorage.getItem('token');

        isValid &&
            axios.put(`${API_URL}/users/${user.username}`, {
                username: userData.username || user.username,
                password: userData.password || user.password,
                email: userData.email || user.email,
                Birthday: user.Birthday
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const data = response.data;
                    setMessage("User info updated");
                    localStorage.setItem('user', JSON.stringify(data));
                    window.location.reload();
                })
                .catch(e => {
                    setMessage("User doesn't exist.");
                    console.log('no such');
                });
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title as="h4" className="text-center">Want to change your profile?</Card.Title>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger my-1 py-2" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <Form>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={userData.username || ''}
                            onChange={handleChange}
                            placeholder="Enter username here"
                            isInvalid={!!errors.username}
                            required />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter password here"
                            isInvalid={!!errors.password}
                            required />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label>e-mail: </Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={userData.email || ''}
                            onChange={handleChange}
                            placeholder="Enter email here"
                            isInvalid={!!errors.email}
                            required />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        type="submit"
                        className="login-btn"
                        disabled={!userData.password}
                        onClick={handleSubmit}>
                        Update
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default UpdateUser;