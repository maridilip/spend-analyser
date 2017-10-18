import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { formatAmount } from '../../../../utils'
// Also, we can take Opportunity Name, Description, 
// Product Type and FullName (assigned to) as the main fields
class OpportunitiesWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewAll: false
        }
        this.onViewAllClick = this.onViewAllClick.bind(this)
    }

    onViewAllClick(viewAll) {
        this.setState({ viewAll })
    }

    render() {
        const { data } = this.props
        const { viewAll } = this.state
        const numberOfWidgets = 4;
        return (<div>
            <Row className={"opportunities"}>
                {data.map((item, index) => {
                    return index < numberOfWidgets || viewAll ? <Col sm={6} md={3} key={`opportunities-widget-${index}`}>
                        <div className="opportunit-widget">
                            <div className="opportunity-name"><h4>{item.WBCOpportunityName}</h4></div>
                            <div className="product-type">{item.WBCProductType}</div>
                            <div className={"amount-withdran"}>{`$${formatAmount(item.randomAmount)} (${item.probabilityPercentage}%)`}</div>
                            <div className="product-desc">{item.Description}</div>
                            <div className="opportunity-assigned"><sub>{(item.FullName || '').toLowerCase()}</sub></div>
                        </div>
                    </Col> : null
                })}
            </Row>
            <Row>
                <Col xs={12}>
                    {!viewAll && data.length > 0 ? <Button onClick={() => this.onViewAllClick(true)} className='pull-right'>View all</Button> : null}
                    {viewAll && data.length > 0 ? < Button onClick={() => this.onViewAllClick(false)} className='pull-right'>Hide few</Button> : null}
                </Col>
            </Row>
        </div >)
    }
}

export default OpportunitiesWidget