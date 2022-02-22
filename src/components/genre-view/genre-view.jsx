import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { genre, onBackClick } = this.props;

        console.log(genre);
        return (
            <Card className="text-center">
                <Card.Header as="h5">Genre Overview</Card.Header>
                <Card.Body>
                    <Card.Title>Genre: {genre.Name}</Card.Title>
                    <Card.Text>{genre.Description}</Card.Text>
                    <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}