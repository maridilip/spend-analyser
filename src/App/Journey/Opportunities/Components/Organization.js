import React from 'react'

import { extractKeyFromObject, flattenXml2JsonArray } from '../../../utils'

export default ({ data }) => {
    const organisationData = extractKeyFromObject(data, 'WBCOpportunityLightweightMS_Account')
    const accountNameObject = flattenXml2JsonArray(organisationData)
    return <div>{accountNameObject && accountNameObject.length > 0 ? accountNameObject[0].WBCAccountName : null}</div>
}