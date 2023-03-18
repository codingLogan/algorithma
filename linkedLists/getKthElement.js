const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

/**
 *
 * @param {LinkedList} list
 * @param {number} lastIndexOffset number of element to get
 * @returns value of element at lastIndexOffset
 */
function algorithm(list, lastIndexOffset) {
  if (list.isEmpty()) {
    throw new Error("List is empty, can't get lastIndexOffset's value")
  }

  // Set up leading "pointer"
  let leadingPointer = list.head
  for (let i = 0; i < lastIndexOffset; i++) {
    leadingPointer = leadingPointer.next
  }

  // Iterate through each item, until leading pointer hits the end
  let desiredElement = list.head
  while (leadingPointer.next) {
    leadingPointer = leadingPointer.next
    desiredElement = desiredElement.next
  }

  return desiredElement.value
}

function test() {
  // 0 means last element
  // 1 means second to last
  // etc
  const cleanList = new LinkedList()
  cleanList.push(1)
  cleanList.push(2)
  cleanList.push(3) // This one
  assert.equal(algorithm(cleanList, 0), '3')

  // Set up a list of no duplicates
  const uncleanList = new LinkedList()
  uncleanList.push(1)
  uncleanList.push(2)
  uncleanList.push(1)
  uncleanList.push(3) // This one
  uncleanList.push(2)
  assert.equal(algorithm(uncleanList, 1).toString(), '3')
}

test()
