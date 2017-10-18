import React, { Component } from "react";
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Section from '../../Components/Section'
import LeadsWidget from './Components/LeadsWidget'
import { getLeadsDataActionCreator } from './reducer/action-creators'

class Leads extends Component {
    componentWillMount() {
        const { getLeadsData, isLoaded } = this.props
        if (!isLoaded) {
            getLeadsData()
        }
    }

    render() {
        const { leadsData } = this.props
        return <Section header="Leads">
            <Row>{leadsData.map((item, index) => <Col sm={4} md={3} key={`leads-${index}`}>
                <LeadsWidget data={item} />
            </Col>)}
            </Row>
        </Section>;
    }
}
const mapStateToProps = state => ({
    isLoaded: state.leads.isLoaded,
    leadsData: state.leads.data
})
const mapDispatchToProps = dispatch => ({
    getLeadsData: () => dispatch(getLeadsDataActionCreator())
})

export default connect(mapStateToProps, mapDispatchToProps)(Leads)
