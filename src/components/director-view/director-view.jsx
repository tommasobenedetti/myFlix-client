import React from "react";
import { Card, Button } from "react-bootstrap";
import "./director-view.scss";

export default class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    console.log(director);
    return (
      <Card className="text-center">
        <Card.Header as="h5">Director Overview</Card.Header>
        <Card.Body>
          <Card.Title>Director: {director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
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
    );
  }
}
