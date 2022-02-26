import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";

export default function ProfileView(props) {
  const { user, setUser, movies, onLoggedOut, onBackClick } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const token = localStorage.getItem("token");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.handleRegistration(username);
  };

  axios
    .put(
      `https://quiet-savannah-08380.herokuapp.com/users/${user.Username}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response.data);
      setUser(response.data);
      window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch((e) => {
      console.log("error updating the user");
    });

  const handleDelete = () => {
    axios
      .delete(
        `https://quiet-savannah-08380.herokuapp.com/users/${user.Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        onLoggedOut();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const favoriteMovies = movies.map(movie => user.FavoriteMovies.includes(movie._id));
  return (
    <Container>
      <Form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Birthday:
          <input
            type="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <Button type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </Form>
      <Button variant="danger">Deregister</Button>
    </Container>
  );
}
