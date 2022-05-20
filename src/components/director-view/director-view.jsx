import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export function DirectorView(props) {
  const { director } = props;
  console.log(director);
  return (
    <div className="director-font">
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>

        </div>
        <div className="director-bio">
          <span className="label">Biography: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birthyear">
          <span className="label">Birthday: </span>
          <span className="value">{director.Birth}</span>
        </div>
      </div>
      <br></br>
      <Link to={`/`}>
        <Button className='returnButton' variant='dark'>Return to the Movie List</Button>
        <br></br><br></br>
      </Link>
    </div >
  )
}