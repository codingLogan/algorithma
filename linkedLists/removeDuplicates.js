const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

/**
 *
 * @param {LinkedList} list
 * @returns
 */
function algorithm(list) {
  if (list.isEmpty()) {
    return list
  }

  // Buffer to keep track of encountered values
  const set = new Set()

  // Iterate through each item, remove duplicates that are encountered
  let prevNode = null
  let currentNode = list.head
  while (currentNode.next) {
    if (set.has(currentNode.value)) {
      // Delete
      prevNode.next = currentNode.next
    } else {
      // Add to set, keep in list
      set.add(currentNode.value)
    }
    prevNode = currentNode
    currentNode = currentNode.next
  }

  // Handle tail item (Duplicate logic...)
  if (set.has(currentNode.value)) {
    prevNode.next = currentNode.next
  }

  return list
}

function test() {
  // Set up a list of no duplicates
  const cleanList = new LinkedList()
  cleanList.push(1)
  cleanList.push(2)
  cleanList.push(3)
  assert.equal(algorithm(cleanList).toString(), '1 2 3')

  // Set up a list of no duplicates
  const uncleanList = new LinkedList()
  uncleanList.push(1)
  uncleanList.push(2)
  uncleanList.push(1)
  uncleanList.push(3)
  uncleanList.push(2)
  assert.equal(algorithm(uncleanList).toString(), '1 2 3')
}

test()
