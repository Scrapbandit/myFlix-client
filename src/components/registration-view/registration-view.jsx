import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";
import { Container, Row, Col, Card, CardGroup, Form, Button } from 'react-bootstrap';
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 2){
     setUsernameErr('Username must be 2 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }

    return isReq;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if(isReq) {
    /* Send request to the server for authentication */
    axios.post('https://agile-dusk-10644.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); 
    })
    .catch(e => {
      console.log('error registering the user')
    });
  }
};

  return (
  <Container>
     <Row>
       <Col>
         <CardGroup>
           <Card>
            <Card.Body>
             <Card.Header>Please Register </Card.Header>
             <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter username" 
                value={username} onChange={e => 
                setUsername(e.target.value)}/>
                {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

               <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
             <Form.Control
              type="password"
              minLength="6"
              placeholder="Password must have 6 or more characters"
              value={password}
              onChange={e => setPassword(e.target.value)}/>
             {passwordErr && <p>{passwordErr}</p>}
           </Form.Group>
             <Form.Group>
              <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email adress" 
                />
              </Form.Group>
                <Form.Group>
                 <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                   required
                    />
                  </Form.Group>
                    <Button variant="light"  type="submit" onClick={handleSubmit}>
                      Register
                  </Button>
                 </Form>
                </Card.Body>
               </Card>
              </CardGroup>
             </Col>
            </Row>
           </Container>
          );
         }

         RegistrationView.propTypes = {
          register: PropTypes.shape({
              Username: PropTypes.string.isRequired,
              Password: PropTypes.string.isRequired,
              Email: PropTypes.string.isRequired,
              Birthday: PropTypes.string.isRequired,
            }).isRequired,
            onRegistration: PropTypes.func.isRequired,
          };
