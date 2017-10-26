import React, { Component } from "react";
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Section from '../../Components/Section'
import Search from '../../Components/Search'
import Loader from '../../Components/Loader'
import LeadsWidget from './Components/LeadsWidget'
import { getLeadsDataActionCreator } from './reducer/action-creators'

class Leads extends Component {
    constructor(props) {
        super(props)
        this.onLeadsSearch = this.onLeadsSearch.bind(this)
    }
    componentWillMount() {
        const { getLeadsData, isLoaded } = this.props
        if (!isLoaded) {
            getLeadsData('C47514') // To be changed after login module comes in
        }
    }

    onLeadsSearch(value) {
        this.props.getLeadsData(value)
    }

    render() {
        const { leadsData, isFetching, leadsError } = this.props
        const oprId = leadsData.length > 0 ? leadsData[0].oprId : ''
        return <Section
            header="Leads"
            subHeader={() => <Search
                value={oprId}
                placeHolder={"Enter the banker id"}
                onSearch={this.onLeadsSearch}
            />}
        >
            <Loader active={isFetching} error={leadsError} errorMsg={"Invalid LID!"}>
                <Row>{leadsData.map((item, index) => <Col sm={4} md={3} key={`leads-${index}`}>
                    <LeadsWidget data={item} />
                </Col>)}
                </Row>
            </Loader>
        </Section>;
    }
}
const mapStateToProps = state => ({
    isLoaded: state.leads.isLoaded,
    isFetching: state.leads.isFetching,
    leadsData: state.leads.data,
    leadsError: state.leads.error
})
const mapDispatchToProps = dispatch => ({
    getLeadsData: (oprId) => dispatch(getLeadsDataActionCreator(oprId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Leads)
