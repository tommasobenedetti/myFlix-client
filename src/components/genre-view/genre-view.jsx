import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    console.log(genre);
    return (
      <Container fluid>
        <Card className="text-center">
          <Card.Header as="h5">Genre Overview</Card.Header>
          <Card.Body>
            <Card.Title>Genre: {genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <Button
              variant="outline-dark"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
