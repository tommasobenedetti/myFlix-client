import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import MovieCard from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, user } = props;
  let filteredMovies = movies;
  console.log(user);

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      <Link to={`/profile/${user.user._id}`}>
        <Button variant="light">My profile</Button>
      </Link>
      <br></br><br></br>
      <Row>
        {filteredMovies.map((m) => (
          <Col md={3} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
