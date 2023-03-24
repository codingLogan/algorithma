const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

function listsIntersect(list1, list2) {
  // Sanity check, are the last nodes equal to each other?
  let list1Node = list1.head
  let list1Last = null
  let list1Length = 0
  while (list1Node !== null) {
    if (list1Node.next === null) {
      list1Last = list1Node
    }
    list1Length++
    list1Node = list1Node.next
  }

  let list2Node = list2.head
  let list2Last = null
  let list2Length = 0
  while (list2Node !== null) {
    if (list2Node.next === null) {
      list2Last = list2Node
    }
    list2Length++
    list2Node = list2Node.next
  }

  if (list1Last === list2Last) {
    return {
      intersect: true,
      list1Length,
      list2Length,
    }
  } else {
    return {
      intersect: false,
      list1Length,
      list2Length,
    }
  }
}

function findIntersectingNode(list1, list2) {
  const { intersect, list1Length, list2Length } = listsIntersect(list1, list2)

  if (!intersect) {
    return null
  }

  let longerList = null
  let longerListLength = null
  let shorterList = null
  let shorterListLength = null
  if (list1Length > list2Length) {
    longerList = list1
    longerListLength = list1Length
    shorterList = list2
    shorterListLength = list2Length
  } else {
    longerList = list2
    longerListLength = list2Length
    shorterList = list1
    shorterListLength = list1Length
  }

  // Use the difference to cut of the front of the longer list
  const cutOffNumber = longerListLength - shorterListLength

  for (let i = 0; i < cutOffNumber; i++) {
    longerList.pop()
  }

  // Compare the lists forwards, until we hit a node that is ===
  let n1 = longerList.head
  let n2 = shorterList.head
  while (n1 !== null) {
    if (n1 === n2) {
      return n1
    }

    n1 = n1.next
    n2 = n2.next
  }
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

  const { intersect } = listsIntersect(list, list2)
  assert.equal(intersect, true)

  const result = findIntersectingNode(list, list2)
  assert.equal(result === intersectingNode, true)
}
test()

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

  const { intersect } = listsIntersect(list, list2)
  assert.equal(intersect, false)
}
test2()

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

  const { intersect } = listsIntersect(list, list2)
  assert.equal(intersect, true)

  const result = findIntersectingNode(list, list2)
  assert.equal(result === intersectingNode, true)
}
test3()
