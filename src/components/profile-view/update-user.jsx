import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate }) {
    return (
        <>
            <h4>Update</h4>
            <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type='text'
                        name='username'
                        defaultValue={user.username}
                        onChange={e => handleUpdate(e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='password'
                        defaultValue={user.password}
                        onChange={e => handleUpdate(e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        name='email'
                        defaultValue={user.email}
                        onChange={e => handleUpdate(e.target.value)}
                        required
                        placeholder="Please enter your email"
                    />
                </Form.Group>

                <Form.Group>
                    <button variant='primary' type='submit' >
                        Update!
                    </button>
                </Form.Group>
            </Form>
        </>
    )
}

export default UpdateUser