import React from 'react'

export default ({ data }) => (<div>
    <div><i className="glyphicon glyphicon-phone" /> - {data.PHONE || '452452416'}</div>
    <div><i className="glyphicon glyphicon-phone-alt" /> - {data.PHONE_WORK}</div>
    <div><i className="glyphicon glyphicon-envelope" /> - {(data.EMAILID || '').toLowerCase()}</div>
    <div><i className="glyphicon glyphicon-home" /> - {"12 / 12 - 14 Main Street, NSW 2078"}</div>
</div>)