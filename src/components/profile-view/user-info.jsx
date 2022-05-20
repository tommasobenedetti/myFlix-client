import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function UserInfo({ email, name }) {
    return (
        <>
            <h4>Your Information</h4>
            <p>User: {name}</p>
            <p>Email: {email}</p>
        </>
    )
}

export default UserInfo