import ServiceCaller from '../../../Services/stub-service'
import requestBuilder from './request-builder'
import responseBuilder from './response-builder'
import { getDomainUrl } from '../../../utils'

export const getLeadsData = (oprId) => {
    const isLocalHost = getDomainUrl().indexOf('localhost') > -1
    const serviceUrl = 'http://crmdevx.trusted.stg.com.au:9081/PSIGW/PeopleSoftServiceListeningConnector/SGB_BANKER_LEADS.1.wsdl'
    const proxyUrl = isLocalHost ? 'http://10.98.3.164:7777/' : ''
    const config = {
        stubUrl: '/data/leads/Output.xml',
        url: `${proxyUrl}${serviceUrl}`,
        isStub: true,
        method: 'POST',
        headers: {
            SOAPAction: '"SGB_BANKER_LEADS_DETAILS.v1"'
        },
        params: requestBuilder(oprId)
    }
    return ServiceCaller.invoke(config).then(res => responseBuilder(res.data))
}

