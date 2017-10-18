import { parseString } from "xml2js"
import { extractKeyFromObject, flattenXml2JsonArray, xmlToString } from '../../../utils.js'

export default (response) => new Promise((resolve, reject) => {
    const xmlString = xmlToString(response)
    parseString(xmlString, { normalize: true }, (err, data) => {
        if (err) {
            reject(err)
        } else {
            const opportunitiesObject = extractKeyFromObject(data, 'ListOfWbcOpportunityLightweightIoMs')
            const opportunitiesArray = extractKeyFromObject(opportunitiesObject, 'WbcOpportunityLightweightMs')
            const flattenData = flattenXml2JsonArray(opportunitiesArray)
            resolve(flattenData)
        }
    })
})