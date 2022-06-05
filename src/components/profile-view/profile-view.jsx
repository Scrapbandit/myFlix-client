
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form, FormGroup, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        };
    }



}