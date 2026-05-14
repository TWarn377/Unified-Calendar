import { getValueFromPathString } from './object-utilities';

/**
 * Merges two arrays of the same type based on the specified identifier path
 * Duplicated identifiers within the respective arrays will be preserved 
 * @param array1 The first array to merge - if identifiers are equal, the item from this array will take precedence
 * @param array2 The second array to merge
 * @param identifierPath The path to the identifier property
 * @returns The merged array
 */
export const mergeArrays = <T>(
  array1: Array<T>,
  array2: Array<T>,
  identifierPath: string,
): Array<T> => {
  const mergedArray: Array<T> = [...array1];
  const array1Ids: Map<any, T> = new Map();

  // THESE ARE ARRAYS - NOT SETS -> PRESERVING DUPLICATES
  array1.forEach(item => array1Ids.set(getValueFromPathString(item, identifierPath), item));
  array2.forEach(item => {
    if (!array1Ids.has(getValueFromPathString(item, identifierPath))) {
      mergedArray.push(item);
    }
  });

  return mergedArray;
};
