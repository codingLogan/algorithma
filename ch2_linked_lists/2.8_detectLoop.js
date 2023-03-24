const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

function algorithm(list) {
  let slow = list.head
  let fast = list.head

  // Find where the pointers meet
  // From Book... This will meet at LOOP_SIZE - k steps into the list
  while (fast !== null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next

    if (slow === fast) {
      break
    }
  }

  // If fast got to a null, there's no loop
  if (fast === null) {
    return null
  }

  // Move slow to Head, and keep fast at meeting point.
  // Each are k steps from the Loop start.
  // If they move at the same pace, they must meet at Loop Start.
  slow = list.head
  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return fast
}

function test() {
  const list = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)
  list.push(5)
  list.push(6)
  list.push(7)
  list.push(8)
  list.push(9)

  // Get the tail node and point it to 6
  let currentNode = list.head
  while (currentNode.next !== null) {
    currentNode = currentNode.next
  }
  assert.equal(currentNode.value, 9)

  const sixthNode = list.head.next.next.next.next.next
  assert.equal(sixthNode.value, 6)

  currentNode.next = sixthNode

  assert.equal(algorithm(list).value, 6)
}
test()
