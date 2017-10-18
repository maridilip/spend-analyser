import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import SelectedCustomer from '../../../Components/SelectedCustomer'
import swimmingIcon from './swimming_icon.png'

const OverviewTitle = () => (<div>
    <h1>Good morning, <span> Alexis </span></h1>
    <h2>Welcome to Banker's portal</h2>
</div>)

const CustomerDetailsTitle = ({ data }) => (<Row>
    <Col md={6}>
        <h1>Good morning, <span className='customer-name'> {data.NAME1.toLowerCase()} </span></h1>
        <h3>You last visited the branch on Jan 1’st 2017</h3>
    </Col>
    <Col xsHidden smHidden md={4} className="customer-details">
        <SelectedCustomer data={data} />
    </Col>
</Row>)

const TitleBar = ({ location, selectedCustomer }) => {
    const isCustomerDetails = location.pathname.indexOf('/CustomerDetails') > -1 && selectedCustomer.NAME1
    return (<div className="title-bar">
        <Row className="title-row">
            <Col xs={1} className="menu icon-hamburger-menu">
            </Col>
            <Col xs={4} className="logo">
                <Link to="/" className="logo-wbc-200">
                </Link>
            </Col>
            {/* <Col xs={3}>
            Customer name dropdown
        </Col>
        <Col xs={2}>
            more option
        </Col>
        <Col xs={2}>
            remider
        </Col> */}
        </Row>
        <Row className="ribbon-cointaner" style={{
            backgroundImage: `url("${swimmingIcon}")`
        }}>
            <Col xs={12} className="ribbon">
                {!isCustomerDetails ? < OverviewTitle /> : <CustomerDetailsTitle data={selectedCustomer} />}
            </Col>
        </Row>
    </div>)
}

const mapStateToProps = state => ({
    selectedCustomer: state.leads.selectedCustomer
})

export default connect(mapStateToProps)(withRouter(TitleBar))