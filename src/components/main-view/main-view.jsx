import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      registered: null,
      user: null
    };
  }


componentDidMount(){ 
  axios.get('https://agile-dusk-10644.herokuapp.com/movies/')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
}

setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

onLoggedIn(user) {
  this.setState({
    user
  });
}

onRegister(registered) {
  this.setState({
    registered,
  });
}

render() {
  const { movies, selectedMovie, user, registered  } = this.state;

  if (registered) {
    return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;
  }

  if (!user) {
    return (<LoginView
        onLoggedIn={(user) => this.onLoggedIn(user)}
        onRegister={(bool) => this.onRegister(bool)}
      />
    );
  }

  if (movies.length === 0) return <div className="main-view"/>;

  return (
    <div className="main-view">
      {selectedMovie
        ? ( <MovieView movie={selectedMovie} 
            onBackClick={(newSelectedMovie) => { 
              this.setSelectedMovie(newSelectedMovie); }}/>
        ) : ( movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} 
          onMovieClick={(newSelectedMovie) => { 
            this.setSelectedMovie(newSelectedMovie);
           }}
          />
        ))
      )}
    </div>
  );
 }
}

export default MainView;

