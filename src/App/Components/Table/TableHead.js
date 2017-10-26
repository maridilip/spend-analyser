import React from 'react'

export default ({ config, onSort, sortParams }) => (<thead className={'table-list-head'}>
    <tr>
        {config.map((item, index) => {
            const sortableClass = item.sortable ? 'col-sortable' : ''
            const sortOrderClass = sortParams.sortColumn === item.field && item.sortable ? sortParams.sortType : ''
            return <th
                width={item.width || "auto"}
                key={`thead-${index}`}
                onClick={() => onSort(item)}
                className={`${sortableClass} ${sortOrderClass}`}
            >
                {item.label}
            </th>
        })}
    </tr>
</thead>)