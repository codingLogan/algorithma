const assert = require('node:assert')

const LinkedList = require('./LinkedList.js')

const fifo = new LinkedList()
fifo.push('hello')
fifo.push('world')
fifo.push('!')
fifo.print()

assert.equal(fifo.toString(), 'hello world !')

assert.equal(fifo.pop(), 'hello')
assert.equal(fifo.pop(), 'world')
assert.equal(fifo.pop(), '!')

try {
  fifo.pop()
} catch (e) {
  assert.equal(e.message, 'cannot pop(), LinkedList is empty')
}
