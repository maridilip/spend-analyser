import React from 'react'

import {formatAmount} from '../../../utils'
export default ({data}) =>(<div>
    <div>{data.key}</div>
    <div>{`$${formatAmount(parseFloat(data.value).toFixed())}`}</div>
</div>)