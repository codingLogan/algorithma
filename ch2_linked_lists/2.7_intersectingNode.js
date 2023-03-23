const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

function listsIntersect(list1, list2) {
  // Sanity check, are the last nodes equal to each other?
  let list1Node = list1.head
  let list1Last = null
  while (list1Node !== null) {
    if (list1Node.next === null) {
      list1Last = list1Node
    }
    list1Node = list1Node.next
  }

  let list2Node = list2.head
  let list2Last = null
  while (list2Node !== null) {
    if (list2Node.next === null) {
      list2Last = list2Node
    }
    list2Node = list2Node.next
  }

  if (list1Last === list2Last) {
    return true
  } else {
    return false
  }
}

function findIntersectingNode(list1, list2) {
  if (!listsIntersect(list1, list2)) {
    return null
  }

  // Use list1 for checks
  let list1Length = 0
  let n1 = list1.head
  while (n1 !== null) {
    list1Length++
    n1 = n1.next
  }

  // Basic, move back one node at a time
  let offset = 0
  while (offset < list1Length) {
    // Set up lead pointer for list1
    n1 = list1.head
    l1 = list1.head
    let n2 = list2.head
    let l2 = list2.head
    for (let i = 0; i < offset; i++) {
      l1 = l1.next
      l2 = l2.next
    }

    // Move list 1 pointers to the offset end
    while (l1.next !== null) {
      n1 = n1.next
      l1 = l1.next
    }

    // Move list 2 pointers to the offset end
    while (l2.next !== null) {
      n2 = n2.next
      l2 = l2.next
    }

    // Moving backwards... as soon as nodes aren't equal,
    // the next node is the intersection
    // console.log({ n1, n2, l1, l2, offset })
    if (n1 !== n2) {
      return n1.next
    }

    offset++
  }

  // Advanced Binary Search?
}

function test() {
  const list = new LinkedList()
  list.push(1) // Head
  list.push(2) // head.next
  list.push(3) // head.next.next
  list.push(4)

  const intersectingNode = list.head.next.next
  assert.equal(intersectingNode.value, 3)

  const list2 = new LinkedList()
  list2.push(1)
  list2.push(2)

  const list2Node = list2.head.next
  assert.equal(list2Node.value, 2)
  assert.equal(list2Node.next, null)
  list2Node.next = intersectingNode // Make list 2 point to the 3rd node in list1

  assert.equal(listsIntersect(list, list2), true)

  const result = findIntersectingNode(list, list2)
  // console.log({ result })
  assert.equal(result === intersectingNode, true)
}
test()

function test3() {
  const list = new LinkedList()
  list.push('n1')
  list.push('n2') // This one is the intersection
  list.push('n3')
  list.push('n4')

  const intersectingNode = list.head.next
  assert.equal(intersectingNode.value, 'n2')

  const list2 = new LinkedList()
  list2.push('1')
  list2.push('2')

  const list2Node = list2.head.next
  assert.equal(list2Node.value, '2')
  assert.equal(list2Node.next, null)
  list2Node.next = intersectingNode // Make list 2 point to the 3rd node in list1

  assert.equal(listsIntersect(list, list2), true)

  const result = findIntersectingNode(list, list2)
  // console.log({ result })
  assert.equal(result === intersectingNode, true)
}
test3()

function test2() {
  const list = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)

  const list2 = new LinkedList()
  list.push(1)
  list.push(2)
  list.push(3)
  list.push(4)

  assert.equal(listsIntersect(list, list2), false)
}
test2()
