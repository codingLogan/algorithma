const assert = require('node:assert')

class StacksQueue {
  constructor() {
    this.newStack = []
    this.oldStack = []
  }

  enqueue(value) {
    this.newStack.push(value)
  }

  dequeue() {
    if (this.oldStack.length <= 0 && this.newStack.length <= 0) {
      throw new Error('stack underflow')
    }

    if (this.oldStack.length <= 0 && this.newStack.length > 0) {
      this.addNewToOld()
    }

    return this.oldStack.pop()
  }

  addNewToOld() {
    while (this.newStack.length > 0) {
      this.oldStack.push(this.newStack.pop())
    }
  }
}

function test() {
  const queue = new StacksQueue()

  queue.enqueue(1)
  queue.enqueue(2)
  assert.equal(queue.dequeue(), 1)
}
test()

function test2() {
  const queue = new StacksQueue()

  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)
  queue.enqueue(4)
  assert.equal(queue.dequeue(), 1)
  assert.equal(queue.dequeue(), 2)
  assert.equal(queue.dequeue(), 3)
}
test2()
