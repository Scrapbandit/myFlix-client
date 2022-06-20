import React from "react";
import { NavBar, Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';


export function MenuBar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };
  return (
    <Navbar
      className="main-nav" sticky="top" bg="light" expand="lg" variant="light">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && ( <Button variant="light" onClick={() => { onLoggedOut() }}>Logout</Button>)}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
let mapStateToProps = state => {
  return {
      movies: state.movies,
      user: state.user
  };
}

export default connect(mapStateToProps, { setUser })(MenuBar);