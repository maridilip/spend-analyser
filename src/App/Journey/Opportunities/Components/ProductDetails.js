import React from 'react'

export default ({ data }) => (<div>
    <label>Type</label>
    <div>{data.WBCProductType}</div>
    <label>Amount</label>
    <div>{data.PrimaryRevenueAmount}</div>
</div>)