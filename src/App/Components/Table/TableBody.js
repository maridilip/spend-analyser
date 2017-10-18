import React from 'react'

export default ({ data, config }) => (<tbody className={'table-list-body'}>
    <tr className={'table-list-body-row'}>
        {config.map((item, index) => <td width={item.width || "auto"} key={`tbody-row-${index}`}>
            <div className={`table-body-row-cell ${item.label.replace(/ /g, '')}`} title={item.field ? data[item.field] : ''}>
                {item.Component ? <item.Component data={data} /> : data[item.field]}
            </div>
        </td>)}
    </tr>
</tbody>)