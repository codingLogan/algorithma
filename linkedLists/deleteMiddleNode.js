const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

/**
 *
 * @param {any} node
 * @returns nothing
 */
function algorithm(node) {
  // Copy the next nodes value into the current one
  // Then we can "delete" the next node instead of this one
  // This gets around not having access to the previous node
  node.value = node.next.value
  node.next = node.next.next
}

function test() {
  const cleanList = new LinkedList()
  cleanList.push(1)
  cleanList.push(2) // Remove this
  cleanList.push(3)

  const node = cleanList.head.next
  algorithm(node, 0)
  assert.equal(cleanList.toString(), '1 3')
}

function test2() {
  const cleanList = new LinkedList()
  cleanList.push(1)
  cleanList.push(2) // Remove this
  cleanList.push(3)
  cleanList.push(4)
  cleanList.push(5)

  const node = cleanList.head.next
  algorithm(node, 0)
  assert.equal(cleanList.toString(), '1 3 4 5')
}

test()
test2()
