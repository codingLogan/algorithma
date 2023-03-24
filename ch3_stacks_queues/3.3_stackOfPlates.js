const assert = require('node:assert')

class SetOfStacks {
  constructor(max) {
    this.stacks = []
    this.stackIndex = null
    this.max = max
  }

  // Push value onto stack
  // Create new stack when necessary
  push(value) {
    // Do we have a stack available?
    if (this.stackIndex === null) {
      this.stacks.push([])
      this.stackIndex = this.stacks.length - 1
    }

    this.stacks[this.stackIndex].push(value)
  }

  pop() {
    if (this.stackIndex === null) {
      throw new Error('stack underflow')
    }

    const popppedValue = this.stacks[this.stackIndex].pop()

    // Delete the stack if it is empty
    if (this.stacks[this.stackIndex].length == 0) {
      delete this.stacks[this.stackIndex]

      // Reset stack pointer
      if (this.stackIndex > 0) {
        this.stackIndex--
      } else {
        this.stackIndex = null
      }
    }

    return popppedValue
  }
}

function basicPushPopTest() {
  let maxPerStack = 2
  const stack = new SetOfStacks(maxPerStack)
  stack.push(1)
  assert.equal(stack.pop(), 1)
}
basicPushPopTest()

function canPushMoreThanMax() {
  let maxPerStack = 2
  let currentValue = 0
  const stack = new SetOfStacks(maxPerStack)

  const expectedValueForPop = 8
  while (currentValue <= expectedValueForPop) {
    stack.push(currentValue++)
  }

  assert.equal(stack.pop(), expectedValueForPop)
}
canPushMoreThanMax()
