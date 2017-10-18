import React from 'react'
import { Row, Col } from 'react-bootstrap'

import Card from '../../../../Components/Card'

const data = [{
    bank: 'westpac',
    accountType: 'Westpac choice'
}, {
    bank: 'westpac',
    accountType: 'Westpac eSaver'
}, {
    bank: 'stg',
    accountType: '55 Day Visa card'
}]
export default () => {
    return <Card className="accounts-widget">
        <div>
            <h4> Accounts </h4>
            <div className="accounts-widget-list">
                {data.map(item => {
                    const className = item.bank === 'westpac' ? 'icon-westpac logo-wbc' : 'icon-stg stg-dragon'
                    return (<Row>
                        <Col xs={2} className={className}></Col> <Col xs={10}>{item.accountType}</Col>
                    </Row>)
                })}
            </div>
        </div>
    </Card>
}