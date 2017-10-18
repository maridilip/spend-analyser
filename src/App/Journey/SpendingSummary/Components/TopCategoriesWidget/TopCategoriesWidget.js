import React from 'react'
import { Row, Col } from 'react-bootstrap'

import Card from '../../../../Components/Card'
import { formatAmount } from '../../../../utils'

export default ({ data }) => {
    const sortedData = [...data].sort((a, b) => {
        if (a.value > b.value) {
            return 1
        }
        if (b.value > a.value) {
            return -1
        }
        return 0
    }).reverse().slice(0, 5)
    return <Card>
        <div className="top-catergories">
            <h4> Top categories</h4>
            <div className="top-catergories-list">
                {sortedData.map(item => <Row>
                    <Col xs={6} className={"category"}>{item.key}</Col>
                    <Col xs={6} className="text-right">{`$${formatAmount(parseFloat(item.value).toFixed(2))}`}</Col>
                </Row>)}
            </div>
        </div>
    </Card>
}