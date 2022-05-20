import React from 'react';
import { Figure } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './profile-view'



function FavoriteMovies({ favoriteMovieList }) {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h2>Favorite Movies</h2>
                </Col>
            </Row>
            <Row>
                {favoriteMovieList.map((ImagePath, Title, _id) => {
                    return (
                        <Col xs={12} md={6} lg={3} key={movies._id}>
                            <Figure>
                                <Link to={`/movies/${_id}`}>
                                    <Figure.Image>
                                        src={ImagePath}
                                        alt={Title}
                                    </Figure.Image>

                                    <Figure.Caption>
                                        {Title}
                                    </Figure.Caption>
                                </Link>
                            </Figure>


                            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
                        </Col>
                    )
                })
                }

            </Row>


        </>
    )
}

export default FavoriteMovies