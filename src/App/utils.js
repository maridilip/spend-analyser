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