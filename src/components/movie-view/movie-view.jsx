import React, { setState } from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class MovieView extends React.Component {
  removeFromFavorite = (event) => {
    event.preventDefault()
    console.log("Remove from list:", this.props.movie, this.props.user)
    const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('remove auth', token)
    
        axios
          .delete(
            `https://agile-dusk-10644.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
            {
              headers: { Authorization:`Bearer ${token}`}
            }
          )
          .then(() => {
            alert(`${this.props.movie.Title} Was removed from your favorites list`);
          })
          .catch((err) => {
            console.log(err);
      })
    }   

    addFavorite = (event) => {
      event.preventDefault()

      console.log('Add to favorites: ', this.props.movie, this.props.user)
  
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      console.log('add auth: ', token);
  
      axios
        .post(
          `https://agile-dusk-10644.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(() => {
          alert(`${this.props.movie.Title} was added to your favorites list`);
        })
        .catch((err) => {
          console.log(err);
        });
      }

  render() {
    if (!this.props?.user || !this.props.movie) return <div />
    const { movie, onBackClick } = this.props;
    const isMovieAFavorite = this.props.user.FavoriteMovies.includes(this.props.movie._id);
    console.log( "Movie", movie);

    return (
      <Container>
        <Row>
          <Col>
            <Card id="movie-view">
              <Card.Body>
                <Card.Img
                  id="movie-view-image"
                  variant="top"
                  crossOrigin="anonymous"
                  src={movie.ImagePath}
                />
                <Card.Title id="movie-title" className="movie-title">
                  {movie.Title}
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
                  <Link to={`/genres/${movie.Genre.Description}`}></Link>
                </Card.Text>
                <Button
                  variant="light"
                  id="movie-view-button"
                  onClick={() => {
                    onBackClick(null);
                  }}>Back</Button>

                <Button
                  variant="primary"
                  className="custom-btn"
                  onClick={(event) => 
                  isMovieAFavorite ? this.removeFromFavorite(event) : this.addFavorite(event)}>
                { isMovieAFavorite ? 'Remove From Favorites' : 'Add to favorites' }
                </Button>
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
