import React from "react";
import axios from "axios";
import "./main-view.scss";
import { Form, Button, Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registered: null,
      user: null,
    };
  }

  getMovies(token) {
    axios.get('https://agile-dusk-10644.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

 componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(registered) {
    this.setState({
      registered,
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // if (registered) {
    //   return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;
    // }

    
    // if (!user) {
    //   return (
    //     <LoginView
    //       onLoggedIn={(user) => this.onLoggedIn(user)}
    //       onRegister={(bool) => this.onRegister(bool)}
    //     />
    //   );
    // }

    // if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Routes>
        {/* I Dont know where should I close the code here for the error */}
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view">
              return movies.map((m) => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
           if (user) return <Redirect to="/" />
           return <Col>
            <RegistrationView />
           </Col>
           }} />
          

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
              onBackClick={() => history.goBack()} /> 
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
           if (movies.length === 0) return <div className="main-view" />;
             return <Col md={8}>
             <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
             onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
           if (movies.length === 0) return <div className="main-view" />;
             return <Col md={8}>
             <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} 
             onBackClick={() => history.goBack()} />
            </Col>
          }} />

           <Route path='/users/:username' render={({history, match}) => {
              if (!user) return <LoginView
               onLoggedIn={user => this.onLoggedIn(user)} />
               If (movies.length === 0) return <div className="main-view"/>
                return
            <ProfileView history={history} movies={movies} user={user === match.params.username} />
          }} />
         </Row>
      </Router>
    );
  }
}

export default MainView;
