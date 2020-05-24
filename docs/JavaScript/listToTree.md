# List To Tree

```js
import keyBy from 'lodash/keyBy'
import deepClone from 'lodash/cloneDeep'
import hasOwnProperty from 'lodash/has'
import getProperty from 'lodash/get'

function createTree(array, parentNodes, customID, childrenProperty) {
  const tree = []

  Object.entries(parentNodes).forEach(([key, node]) => {
    const childNode = array[node[customID]]
    if (node || hasOwnProperty(parentNodes, key)) {
      if (childNode) {
        node[childrenProperty] = createTree(
          array,
          childNode,
          customID,
          childrenProperty,
        )
      }
      tree.push(node)
    }
  })
  return tree
}

function groupByParents(array, options) {
  const arrayByID = keyBy(array, options.customID)

  return array.reduce(function (prev, item) {
    let parentID = getProperty(item, options.parentProperty)
    if (!parentID || !hasOwnProperty(arrayByID, parentID)) {
      parentID = options.rootID
    }

    if (parentID && hasOwnProperty(prev, parentID)) {
      prev[parentID].push(item)
      return prev
    }

    prev[parentID] = [item]
    return prev
  }, {})
}


/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a nested
 * data structure
 *
 * @name arrayToTree
 * @function
 *
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 * a parent node could be found. Default: 'parent_id'
 *  - `customID` (String): An unique node identifier. Default: 'id'
 *  - `childrenProperty` (String): A name of a property where children nodes
 * are going to be stored. Default: 'children'.
 *
 * @return {Array} Result of transformation
 */

export default function arrayToTree(data, options) {
  options = {
    parentProperty: 'parent_id',
    childrenProperty: 'children',
    customID: 'id',
    rootID: '0',
    deepClone: false,
    ...options,
  }

  if (!Array.isArray(data)) {
    console.error('list to tree: Expected an array but got an invalid argument')
    return []
  }
  
  if (!data.length) {
    return []
  }

  const grouped = groupByParents(options.deepClone ? deepClone(data) : data, options)
  return createTree(
    grouped,
    grouped[options.rootID],
    options.customID,
    options.childrenProperty,
  )
}



```