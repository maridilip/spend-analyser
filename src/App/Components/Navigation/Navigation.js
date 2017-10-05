import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';

const navigatorData = [{
    path: '/SpendingSummary',
    content: 'Spending Summary'
}, {
    path: '/Leads',
    content: 'Leads'
}, {
    path: '/Opportunities',
    content: 'Opportunities'
}]
const Navigation = ({ location }) => (<Navbar className="westpac-navbar">
    <Nav>
        {navigatorData.map(item => {
            const className = item.path === location.pathname ? 'selected' : ''
            return <NavItem className={`nav-item ${className}`}>
                <Link to={item.path} ><h4>{item.content}</h4></Link>
            </NavItem>
        })}
    </Nav>
</Navbar>)

export default withRouter(Navigation)