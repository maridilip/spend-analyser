import { parseString } from "xml2js"
import { extractKeyFromObject, flattenXml2JsonArray, xmlToString } from '../../../utils.js'

export default (response) => new Promise((resolve, reject) => {
    const xmlString = xmlToString(response)
    parseString(xmlString, { trim: true }, (err, data) => {
        if (err) {
            reject(err)
        } else {
            const leadsObject = extractKeyFromObject(data, 'SGB_LEAD_RS0_WK')
            const oprId = extractKeyFromObject(leadsObject, 'OPRID')[0]._
            const leadsArray = extractKeyFromObject(leadsObject, 'SGB_LEAD_RES_WK')
            const flattenData = flattenXml2JsonArray(leadsArray)
            resolve(flattenData.map(item => ({
                oprId,
                ...item
            })))
        }
    })
})