import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";
import { Container, Row, Col, Card, CardGroup, Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
  };

  return (
  <Container>
     <Row>
       <Col>
         <CardGroup>
           <Card>
            <Card.Body>
             <Card.Header>Please Register</Card.Header>
             <Form>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                 <Form.Control
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required
                   placeholder="Enter a username"
                  />
                </Form.Group>
               <Form.Group>
              <Form.Label>Password</Form.Label>
             <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              placeholder="Password must have 8 or more characters"
             />
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
                    <Button type="submit" onClick={handleSubmit}>
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
