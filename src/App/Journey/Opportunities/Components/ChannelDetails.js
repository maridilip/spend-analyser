import React from 'react'

export default ({ data }) => (<div>
    <label>Initiating Channel</label>
    <div>{data.Channel}</div>
    <label>Source</label>
    <div>{data.WBCSource}</div>
</div>)