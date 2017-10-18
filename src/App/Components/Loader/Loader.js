import React from 'react'
import { Loader } from 'react-loaders'

export default ({ children, active }) => (<div className='westpac-loader'>
    {children ? <div>
        <Loader type="line-scale" active={active} />
        {children}
    </div> : <Loader type="line-scale" active={active} />}
</div>)