const assert = require('node:assert')

class MyStack {
  constructor() {
    this.stack = []
  }

  /**
   *
   * @returns {Object} {min, value}
   */
  peek() {
    return this.stack[this.stack.length - 1]
  }

  push(value) {
    this.stack.push({
      min: this.stack.length <= 0 ? value : Math.min(this.peek().min, value),
      value,
    })
  }

  /**
   *
   * @returns {Object} {min, value}
   */
  pop() {
    return this.stack.pop()
  }

  min() {
    return this.peek().min
  }
}

// function algorithm(list) {}

function test() {
  const stack = new MyStack()
  stack.push(2)
  stack.push(4)
  stack.push(3)
  stack.push(1)
  stack.push(5)

  assert.equal(stack.min(), 1)

  stack.pop()
  assert.equal(stack.min(), 1)

  stack.pop()
  assert.equal(stack.min(), 2)
}
test()
