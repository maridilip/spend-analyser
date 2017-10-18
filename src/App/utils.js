const FORMAT_AMOUNT_REGEX = /(\d)(?=(\d{3})+(?!\d))/g

export const getBaseUrl = () => process.env.PUBLIC_URL;
export const extractKeyFromObject = (theObject, key) => {
    var result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = extractKeyFromObject(theObject[i], key);
        }
    }
    else {
        for (var prop in theObject) {
            if (prop === key) {
                return theObject[prop];
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
                result = extractKeyFromObject(theObject[prop], key);
        }
    }
    return result;
}

export const flattenXml2JsonArray = (array) => {
    if (!array) {
        return null
    }
    return array.map(item => {
        const tempObj = {}
        Object.keys(item).forEach(name => {
            if (name !== '$') {
                const extractValueFromObject = extractKeyFromObject(item[name], '_')
                tempObj[name] = extractValueFromObject ? extractValueFromObject :
                    item[name] instanceof Array ? item[name][0] : null
            }
        })
        return tempObj
    })
}

export const formatAmount = (value) => (value ? value.toString().replace(FORMAT_AMOUNT_REGEX, "$1,") : 0)
export const xmlToString = (doc) => (typeof doc === 'object' ? (new XMLSerializer().serializeToString(doc)) : doc)
export const getDomainUrl = () => window.location.host