import React from 'react'

export default ({ config }) => (<thead className={'table-list-head'}>
    <tr>
        {config.map((item, index) => <th width={item.width || "auto"} key={`thead-${index}`}>{item.label}</th>)}
    </tr>
</thead>)