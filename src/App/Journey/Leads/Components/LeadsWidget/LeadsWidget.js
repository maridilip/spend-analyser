import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import WidgetOverlay from '../../../../Components/WidgetOverlay'
import { selectCustomerActionCreator } from '../../reducer/action-creators'
const LeadsWidget = ({ data, selectCustomer }) => (<WidgetOverlay
    overlayContet={() => <Link
        onClick={() => selectCustomer(data)}
        to="/CustomerDetails"
    > Click here for customer details</Link >}
>
    <div className='leads-widget-box'>
        <div className='lead-contact'>
            <h4 className='lead-name'>{(data.NAME1 || '').toLowerCase()}</h4>
            <div className='lead-email'>{data.PHONE}</div>
        </div>
        <div className='lead-details'>
            <b>Referred by:</b> {data.OPRDEFNDESC}
            <br />
            {data.DESCRLONG}
        </div>
    </div>
</WidgetOverlay >)

const mapDispatchToProps = dispatch => ({
    selectCustomer: (data) => dispatch(selectCustomerActionCreator(data))
})
export default connect(null, mapDispatchToProps)(LeadsWidget)