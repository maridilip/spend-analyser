import axios from 'axios'
import { getBaseUrl } from '../utils'

class StubService {
    invoke(options) {
        let { method } = options
        const { stubUrl, url, headers, params, isStub } = options
        const stubServiceUrl = getBaseUrl() + stubUrl
        const serviceUrl = isStub ? stubServiceUrl : url
        const additionalheaders = {
            'Content-Type': 'text/html;charset=UTF-8',
            ...headers
        }
        method = method.toLocaleLowerCase()

        const instance = axios.create({
            headers: additionalheaders
        })

        if (method === 'get' || isStub) {
            return instance.get(serviceUrl).then(response => response)
        }
        return instance[method](serviceUrl, params).then(response => response)
    }
}

export default new StubService()

// Just for reference
// axios.defaults.headers['Access-Control-Allow-Origin'] = 'https://crmdevx.trusted.stg.com.au:9444'
// axios.defaults.headers['Content-Type'] = 'text/html;charset=UTF-8'
// axios.defaults.headers['Access-Control-Allow-Headers'] = 'Content-Type'
// axios.defaults.headers['Access-Control-Allow-Credentials'] = true
// axios.defaults.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,DELETE,PUT'