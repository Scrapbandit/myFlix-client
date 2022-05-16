import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Inception",
          Description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
          ImageURL:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
            Genre: ({
              Name: "Thriller",
          }),
          Director: ({
            Name: "",
          })
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description:
            "The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella Rita Hayworth",
          ImageURL:
            "https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg",
          Genre: ({
              Name: "",
          }),
          Director: ({
            Name: "",
        }),
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description:
            "Gladiator is a 2000 epic historical drama film directed by Ridley Scott and written by David Franzoni, John Logan, and William Nicholson.",
          ImageURL:
            "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
            Genre: ({
              Name: "",
          }),
          Director: ({
            Name: "",
        }),
       },
      ],
      selectedMovie: null,
      registered: null,
      user: null
    };
  }


// componentDidMount(){ 
//   axios.get('https://agile-dusk-10644.herokuapp.com/')
//     .then(response => {
//       this.setState({
//         movies: response.data
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

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

