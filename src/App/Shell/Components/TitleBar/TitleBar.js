import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

export default () => (<div className="title-bar">
    <Row className="title-row">
        <Col xs={1} className="menu icon-hamburger-menu">
        </Col>
        <Col xs={4} className="logo">
            <Link to="/" className="logo-wbc-200">
            </Link>
        </Col>
        <Col xs={3}>
            Customer name dropdown
        </Col>
        <Col xs={2}>
            more option
        </Col>
        <Col xs={2}>
            remider
        </Col>
    </Row>
    <Row className="ribbon-cointaner">
        <Col xs={12} className="ribbon">
            <h1>Good morning, <span> Alexis </span></h1>
            <h2>Welcome to Innovation Funds</h2>
        </Col>
    </Row>
</div>)