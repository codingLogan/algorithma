class LinkedList {
  static EMPTY = null
  static TAIL = null

  constructor() {
    this.head = LinkedList.EMPTY
  }

  isEmpty() {
    return this.head === LinkedList.EMPTY
  }

  // Add item to end of list
  push(newValue) {
    const newNode = this.createNode(newValue)
    if (this.isEmpty()) {
      // This is the first item, so set head to a Node
      this.head = newNode
    } else {
      // Traverse nodes until the end
      let currentNode = this.head
      while (currentNode.next) {
        currentNode = currentNode.next
      }

      currentNode.next = newNode
    }
  }

  // Remove the head item and return the value
  pop() {
    if (this.isEmpty()) {
      throw new Error('cannot pop(), LinkedList is empty')
    }

    // Return this value
    const headCopy = { ...this.head }

    // Treat last item special
    if (this.head.next === LinkedList.TAIL) {
      this.head = LinkedList.EMPTY
    } else {
      this.head = this.head.next
    }

    return headCopy.value
  }

  createNode(value) {
    return new Node(value)
  }

  print() {
    if (this.isEmpty()) {
      return 'empty'
    }

    let currentNode = this.head
    while (currentNode?.next) {
      console.log(currentNode.value)
      currentNode = currentNode.next
    }
    console.log(currentNode.value)
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

module.exports = LinkedList
