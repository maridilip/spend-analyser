import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Section from '../../Components/Section'
import Card from '../../Components/Card'
import SelectedCustomer from '../../Components/SelectedCustomer'
import Opportunities from '../Opportunities'
import SpendingSummary from '../SpendingSummary'
const CustomerDetails = ({ customerDetails }) => (<div>
    <Row>
        <Col mdHidden lgHidden xs={12}>
            <Section header="Cusomer details">
                <Card>
                    <SelectedCustomer data={customerDetails} />
                </Card>
            </Section>
        </Col>
    </Row>
    <Opportunities />
    <SpendingSummary />
</div>)

const mapStateToProps = state => ({
    customerDetails: state.leads.selectedCustomer
})
export default connect(mapStateToProps)(CustomerDetails)