import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './director-view.scss';

export class DirectorView extends React.Component {
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
        const { director, onBackClick } = this.props;
        console.log(director);
        return (
            <Card className="text-center">
                <Card.Header as="h5">Director Overview</Card.Header>
                <Card.Body>
                    <Card.Title>Director: {director.Name}</Card.Title>
                    <Card.Text>{director.Bio}</Card.Text>
                    <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}