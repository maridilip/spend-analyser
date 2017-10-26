import React from 'react'
import { Loader } from 'react-loaders'
const DEFAULT_ERROR_MSG = "Oops.. something went wrong"
export default ({ children, active, error, errorMsg = DEFAULT_ERROR_MSG }) => (<div className='westpac-loader'>
    {children ? <div>
        <Loader type="line-scale" active={active} />
        {error ? <h4 className={"error-msg-container"}>{errorMsg}</h4> : children}
    </div> : <Loader type="line-scale" active={active} />}
</div>)