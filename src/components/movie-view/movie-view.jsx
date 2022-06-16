import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      
  <Container>
      <Row>
          <Col>
              <Card id="movie-view">
                  <Card.Body>
                  <Card.Img id="movie-view-image" variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
                  <Card.Title id="movie-title" className="movie-title">{movie.Title}
                  <Link to={`/movies/${movie._id}`}></Link>
                   </Card.Title>
                  <Card.Text id="movie-description" className="movie-description">
                      {movie.Description}
                      <Link to={`/movies/${movie.Description}`}></Link>
                      </Card.Text>
                  <Card.Text id="movie-director" className="movie-director">
                      Director: {movie.Director.Name}
                      <Link to={`/directors/${movie.Director.Name}`}></Link>
                      </Card.Text>
                  <Card.Text id="director-bio" className="director-bio">
                      Bio: {movie.Director.Bio}
                      <Link to={`/directors/${movie.Director.Bio}`}></Link>
                      </Card.Text>
                  <Card.Text id="movie-genre" className="movie-gerne">
                      Genre: {movie.Genre.Name}
                       <Link to={`/genres/${movie.Genre.Name}`}></Link>
                       </Card.Text>
                  <Card.Text id="genre-description" className="gerne-description">
                      Description: {movie.Genre.Description}
                      <Link to={`/genres/${movie.Genre.Description}`}></Link></Card.Text>
                  <Button variant="light" id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
  </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};