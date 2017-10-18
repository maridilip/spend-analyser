import React from 'react'

export default ({ data }) => (<div>
    <label>Opportunity Name</label>
    <div>{data.WBCOpportunityName}</div>
    <label>Description</label>
    <div>{data.Description}</div>
</div>)