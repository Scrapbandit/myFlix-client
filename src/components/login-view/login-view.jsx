import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import "./login-view.scss";
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";


export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://agile-dusk-10644.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    
    .catch(e => {
      console.log('no such user')
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
        <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username" value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password" value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="light" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="light" type="register" onClick={()=> {history.push('register')}}>
        Register
      </Button>
    </Form>
   

        
    
   
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
