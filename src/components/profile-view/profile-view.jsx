
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { connect } from 'react-redux';
import { remFavMovie } from '../../actions/actions';

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null ,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }


    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }
    getUser(token) {
        const Username = localStorage.getItem('user');

        axios.get(`https://agile-dusk-10644.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    updateUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://agile-dusk-10644.herokuapp.com/users/${Username}`, 
        {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
        },{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday
            });

            localStorage.setItem('user', this.state.Username);
            alert("Saved changes");
        });
    }
    removeFromFavorite = (event, movie) => {
        event.preventDefault()

        console.log('removing from favorites: ', movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('remove fav auth: ', token)
    
        axios
          .delete(
            `https://agile-dusk-10644.herokuapp.com/users/${username}/movies/${movie._id}`,
            {
              headers: { Authorization:`Bearer ${token}`}
            }
          )
          .then((res) => {
            this.setState({ FavoriteMovies: res?.data?.FavoriteMovies });
            this.props.remFavMovie(res?.data)
            alert(`${movie.Title} was removed from your favorites list`);
          })
          .catch((err) => {
            console.log(err);
      })
    }

    removeUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://agile-dusk-10644.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            //We wouldn't want them to have a token now would we?
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            console.log("Profile has been deleted")
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
    }


    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }
    getBirthdayValue = () => {
        if (this.state.Birthday) return this.state.Birthday.split('T')[0]
        return ''
    }

    render() {
        const { movies } = this.props;
        const { FavoriteMovies, Username, Password, Email, Birthday } = this.state;

        return (
            <Container>
            {/* Movie Card */}
            <Row>
                <Col>
                    <Card id="update-profile-card">
                        <Card.Body>
                            <Card.Title>Your Profile</Card.Title>
                            <Form
                                onSubmit={(e) => {
                                    this.updateUser(e)
                                }} >
                                {/* Username Form */}
                                <FormGroup>
                                    <Form.Label>Username</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="username"
                                        placeholder="Enter a new username"
                                        value={Username}
                                        onChange={(e) => this.setUsername(e.target.value || '')}
                                        required />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Password</Form.Label>
                                    <FormControl
                                        type="password"
                                        name="password"
                                        placeholder="Enter a new password"
                                        value={Password}
                                        onChange={(e) => this.setPassword(e.target.value || '')}
                                        required />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        placeholder="Enter a new email"
                                        value={Email}
                                        onChange={(e) => this.setEmail(e.target.value)}
                                        required />
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Birthday</Form.Label>
                                    <FormControl
                                        type="date"
                                        name="birthday"
                                        placeholder="Enter a new birthday"
                                        value={this.getBirthdayValue()}
                                        onChange={(e) => this.setBirthday(e.target.value)}
                                        required />
                                </FormGroup>
                                <br></br>
                                <Button 
                                    id="update-user-button"
                                    variant="light"
                                    type="submit"
                                    onClick={this.updateUser}>
                                        Update User Info
                                </Button>

                                <Button 
                                    id="delete-profile-button"
                                    variant="secondary"
                                    onClick={() => this.removeUser()}>
                                        Delete Profile
                                </Button>
                            </Form>
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col id="fav-movie-card-col">
                    <Card>
                        <Card.Body>
                            <Card.Title id="fav-movie-card-title">Your Favorite Movies</Card.Title>
                            {!FavoriteMovies || FavoriteMovies.length === 0 && (
                                <div>You haven't added any movies to your favorites list</div>
                            )}
                            <Row>
                                {FavoriteMovies?.length > 0 && movies.map((movie) => {
                                    if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                                        return (
                                            <Card id="fav-movie-card-card" key={movie._id}  className="mx-auto">
                                                <Card.Img
                                                    id="fav-movie-img"
                                                    className="favorite-movie-image"
                                                    variant="top"
                                                    src={movie.ImagePath}
                                                />
                                                <Card.Body>

                                                    <Card.Title className="movie-title">
                                                        {movie.Title}
                                                    </Card.Title>

                                                    <Button value={movie._id} onClick={(e) => this.removeFromFavorite(e, movie)}>
                                                        Remove from Favorites
                                                    </Button>

                                                </Card.Body>
                                            </Card>
                                            );
                                        }
                                    })}
                                </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { remFavMovie })(ProfileView);        
    
