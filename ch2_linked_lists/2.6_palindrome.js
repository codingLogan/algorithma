const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

function algorithm(list) {
  const stack = []

  let currentNode = list.head
  while (currentNode !== null) {
    stack.push(currentNode.value)
    currentNode = currentNode.next
  }

  // Check the end of the stack and beginning of the stack for matches
  let iEnd = stack.length - 1
  let iStart = 0
  for (iStart = 0; iStart < Math.floor(stack.length / 2); iStart++) {
    if (stack[iStart] !== stack[iEnd]) {
      return false
    }

    iEnd--
  }

  return true
}

function test() {
  const list = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(2)
  list.push(1)

  assert.equal(algorithm(list), true)
}
test()

function test2() {
  const list = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(2)
  list.push(1)

  assert.equal(algorithm(list), true)
}
test2()

function test3() {
  const list = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  list.push(2)
  list.push(1)

  assert.equal(algorithm(list), false)
}
test3()
