import ServiceCaller from '../../../Services/stub-service'
import requestBuilder from './request-builder'
import responseBuilder from './response-builder'
import { getDomainUrl } from '../../../utils'

export const getOpportunitiesData = (data) => {
    const isLocalHost = getDomainUrl().indexOf('localhost') > -1
    const serviceUrl = 'http://rbdev-p.crm.srv.westpac.com.au/eai_enu/start.swe?SWEExtSource=SecureWebService&SWEExtCmd=Execute&WSSOAP=1'
    const proxyUrl = isLocalHost ? `http://10.98.3.164:7777/` : ''
    const config = {
        stubUrl: '/data/opportunities/Output.xml',
        url: `${proxyUrl}${serviceUrl}`,
        isStub: false,
        method: 'POST',
        headers: {
            SOAPAction: '"document/http://siebel.com/webservices:GetOpportunities"'
        },
        params: requestBuilder(data)
    }
    return ServiceCaller.invoke(config).then(res => responseBuilder(res.data))
}

