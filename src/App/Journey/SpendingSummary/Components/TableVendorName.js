import React from 'react'

export default ({ data }) => <div className={"vendor-name"}>
    <div className={"vendor-name-content"} title={data.vendorName}>{data.vendorName}</div>
</div>