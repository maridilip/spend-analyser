import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';

const Navigation = ({ navigatorData, location }) => (<Navbar className="westpac-navbar">
    <Nav>
        {navigatorData.map((item, index) => {
            const className = item.path === location.pathname ? 'selected' : ''
            return <li key={`nav-item-${index}`} className={`nav-item ${className}`}>
                <Link to={item.path} ><h4>{item.content}</h4></Link>
            </li>
        })}
    </Nav>
</Navbar>)

export default withRouter(Navigation)