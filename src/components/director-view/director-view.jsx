import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';


export default function DirectorView(props) {
  const { director, onBackClick } = props;
  console.log(director);
  return (
    <Container fluid>
      <Card className="text-center">
        <Card.Header as="h5">Director Overview</Card.Header>
        <Card.Body>
          <Card.Title className="director-name">
            <span className="label"> </span>
            <span className="value">{director.Name}</span>

          </Card.Title>
          <Card.Text className="director-bio">
            <span className="label">Biography: </span>
            <span className="value">{director.Bio}</span>
          </Card.Text>
          <Card.Text className="director-birthyear">
            <span className="label">Birthday: </span>
            <span className="value">{director.Birth}</span>
          </Card.Text>



          <Button variant="outline-dark" onClick={() => onBackClick(null)}>Back</Button>
        </Card.Body>
      </Card >
    </Container>
  )
}