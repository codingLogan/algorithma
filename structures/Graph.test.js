const assert = require('node:assert')
const { Graph, Node } = require('./Graph.js')

function test() {
  const graph = new Graph()
  assert.equal(graph.nodes.length, 0)
}
test()
