import React from 'react'

export default ({ data }) => (<div>
    <label>Sales Status</label>
    <div>{data.OpportunitySalesStatus}</div>
    <label>Sales Stage</label>
    <div>{data.SalesStage}</div>
</div>)