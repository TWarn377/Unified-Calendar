/**
 * Used to validate the provided path string
 */ 
const VALID_PATH_REGEX = /^[a-zA-Z_$][a-zA-Z0-9_$]*(\.[a-zA-Z_$][a-zA-Z0-9_$]*|\[\d+\]|\["[^"]+"\]|\['[^']+'\])*$/;

/**
 * Matches array indexes within the path string
 */
const ARRAY_INDEX_REGEX = /\[['"]?([\dA-Za-z_]+)['"]?\]/g;

/**
 * Gets the value at the specified path of the provided object.
 * @param obj The object to retrieve the value from
 * @param path The path that contains the value to retrieve
 * @returns The value located in the specified path of the provided object
 */
export const getValueFromPathString = (obj: any, path: string): any => {
    if (!isValidObjectPathString(path)) { 
        throw new Error(`${path} is not a valid object path.`);
    }

    const pathProperties: Array<string> = path.split('.');
    let currentObj = obj;

    while (pathProperties.length > 0) {
        const curPath: string = pathProperties.shift() as string;
        const currentProperty = currentObj[curPath.split('[')[0]];
        const type = Array.isArray(currentProperty) ? 'array' : typeof currentProperty;
        
        
        
        switch (type) {
            case 'array':
                const arrayIndexes = [...curPath.matchAll(ARRAY_INDEX_REGEX)]
                    .map(match => match[1]);
                
                currentObj = arrayIndexes.reduce((acc, currIndex) => { return acc[currIndex] }, currentProperty);
                break;
            case 'undefined':
                throw new Error(`Property ${path} does not exist.`)
            default:
                currentObj = currentProperty;
                break;
        }
    }

    return currentObj;
};

/**
 * Returns a boolean indicating if the provided string is valid.
 * @param path The string representation of the path to validate.
 * @returns A boolean indication if the provided path is valid.
 */
 const isValidObjectPathString = (path: string): boolean => {
    return VALID_PATH_REGEX.test(path);
}