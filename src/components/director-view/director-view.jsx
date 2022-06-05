import React from "react";
import PropTypes from "prop-types";
import {Col, Row, Button}from 'react-bootstrap';
import { connect } from "react-redux";

import './director-view.scss';

export class DirectorView extends React.Component{

    render() {
        const{ director, onBackClick} = this.props;
    
        return (
            <>
         <Row>
              <Col med={4} className="director-view">
              <div className="director-name" />
              <span className="label">Director: </span>
              <span className="value">{director.Name}</span>
              </Col>
            </Row>
            <Row>
              <Col med={4} className="director-view">
              <div className="director-name" />
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
              </Col>
            </Row>
            <Row>
              <Col>
              
                <Button  onClick={() => { onBackClick(null); } } variant="light" style={{marginTop: 50, }}>Back</Button>
                
              </Col>
            </Row></>
        );
      }
    }

DirectorView.propTypes = {
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };