const assert = require('node:assert')

class PeekyArray {
  constructor(initialArray = []) {
    this.array = initialArray
  }

  push(value) {
    this.array.push(value)
    // console.log('after push', this.array)
  }

  pop() {
    // console.log('before pop', this.array)
    return this.array.pop()
  }

  peek() {
    if (this.array.length <= 0) {
      throw new Error('No value to peek at')
    }

    // console.log('peek', this.array[this.array.length - 1])
    return this.array[this.array.length - 1]
  }

  length() {
    return this.array.length
  }

  get() {
    return this.array
  }
}

function sortStack(stack) {
  const tempStack = new PeekyArray()

  // Now move elements into temp stack
  while (stack.length() > 0) {
    let holdValue = stack.pop()

    if (tempStack.length() <= 0 || holdValue > tempStack.peek()) {
      tempStack.push(holdValue)
    } else {
      // IF - stack element value is less than temp's top - we need to pop elements away until the value is greater than temp's top
      while (tempStack.length() > 0 && holdValue < tempStack.peek()) {
        // Move values back to stack to make room for holdValue's proper place
        stack.push(tempStack.pop())
      }

      tempStack.push(holdValue)
    }
  }

  // Bottom of temp stack should be lowest values, pusht them all back to stack
  while (tempStack.length() > 0) {
    stack.push(tempStack.pop())
  }
}

function test() {
  const stack = new PeekyArray()
  stack.push(1)
  assert.equal(stack.peek(), 1)
  stack.pop()
}
test()

function fullTest() {
  const stack = new PeekyArray([3, 1, 4, 2])
  sortStack(stack)
  assert.deepEqual(stack.get(), [4, 3, 2, 1])
}
fullTest()
