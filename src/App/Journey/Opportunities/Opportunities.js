import React, { Component } from "react";

import { getOpportunitiesData } from './service'
import Section from '../../Components/Section'
import Loader from '../../Components/Loader'
import { OpportunitiesWidget } from './Components'
// import Table from '../../Components/Table'
// import {
//     OpportunityDetails, ChannelDetails, ProductDetails,
//     ContactDetails, StatusDetails, Organization, OpportunitiesWidget
// } from './Components'

// const config = [{
//     label: "Opportunity Details",
//     Component: OpportunityDetails
// }, {
//     label: "Assigned To",
//     field: "AssignedTo"
// }, {
//     label: "Channel Details",
//     Component: ChannelDetails
// }, {
//     label: "Product Details",
//     Component: ProductDetails
// }, {
//     label: "Created Date",
//     field: "CreatedDate"
// }, {
//     label: "Contact",
//     Component: ContactDetails
// }, {
//     label: "Organisation",
//     Component: Organization
// }, {
//     label: "Opportunity Sales Status",
//     Component: StatusDetails
// }, {
//     label: "Reason Won/Lost",
//     field: "ReasonWonLost"
// }]

class Opportunities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opportunitiesData: []
        }
    }

    componentDidMount() {
        getOpportunitiesData().then(respose => this.setState({
            opportunitiesData: respose.map(item => {
                item.probabilityPercentage = Math.floor(Math.random() * 99) + 1
                item.randomAmount = Math.floor(Math.random() * 500000) + 1000
                return item
            })
        }))
    }

    render() {
        // return <Table config={config} data={this.state.opportunitiesData} />
        const isLoading = this.state.opportunitiesData.length > 0 ? false : true
        return <Section header="Opportunities">
            <Loader active={isLoading}>
                <OpportunitiesWidget data={this.state.opportunitiesData} />
            </Loader>
        </Section>
    }
}
export default Opportunities;
