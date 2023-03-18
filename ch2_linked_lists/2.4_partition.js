const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

/**
 *
 * @param {list} node
 * @param {number} partitionAt min number for second partition
 * @returns New head node
 */
function algorithm(list, partitionAt) {
  let head = list.head
  let tail = list.head

  let currentNode = list.head

  while (currentNode !== null) {
    const nextNode = currentNode.next // Get reference to next iterable node
    if (currentNode.value < partitionAt) {
      currentNode.next = head
      head = currentNode
    } else {
      tail.next = currentNode
      tail = currentNode
    }
    currentNode = nextNode
  }

  tail.next = null
  list.setHead(head)
}

function test() {
  const cleanList = new LinkedList()
  cleanList.push(1)
  cleanList.push(4) // Tail item
  cleanList.push(5) // Tail item
  cleanList.push(2)
  cleanList.push(3)
  console.log(cleanList.toString())

  const partitionValue = 4
  algorithm(cleanList, partitionValue)
  console.log(cleanList.toString())

  let currentNode = cleanList.head
  let inSecondPartition = false
  while (currentNode !== null) {
    if (currentNode.value >= partitionValue) {
      inSecondPartition = true
    }

    // If the iteration is into the second partition, it should never go back to lower values
    if (!inSecondPartition) {
      assert.equal(currentNode.value < partitionValue, true)
    } else {
      assert.equal(currentNode.value >= partitionValue, true)
    }
    currentNode = currentNode.next
  }
}

test()
