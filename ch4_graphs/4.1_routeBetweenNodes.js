/*
  4.1

  Write and alorithm to detect if there's a route from Node S to Node E

  Input) a Directed Graph, and 2 Nodes
  Output) boolean - true if S can route to E
*/

const { Graph, Node } = require('../structures/Graph.js')
const LinkedList = require('../ch2_linked_lists/LinkedList.js')
const assert = require('node:assert')

const NODE_STATUS = {
  NEW: 1,
  VISITING: 2,
  VISITED: 3,
}

function canNodeSReachE(graph, s, e) {
  // graph nodes have a status property
  // s is the node that exists inside the graph
  assert.equal(s.status, NODE_STATUS.NEW)
  // e is the node that exists inside the graph
  const queue = new LinkedList()

  // Start the search at S
  s.status = NODE_STATUS.VISITING
  queue.push(s)

  while (!queue.isEmpty()) {
    const currentNode = queue.pop()

    // Add all connections to the queue
    for (let i = 0; i < currentNode.connections.length; i++) {
      let connectionNode = currentNode.connections[i]

      // If we find the target node
      if (connectionNode === e) {
        return true
      }

      if (connectionNode.status === NODE_STATUS.NEW) {
        // Mark this node as "visiting"
        connectionNode.status = NODE_STATUS.VISITING
        queue.push(connectionNode)
      }
    }

    // We've gone through all children, mark node as visited
    currentNode.status = NODE_STATUS.VISITED
  }

  return false
}

function addStatusToNodes(graph) {
  graph.nodes.forEach((node) => ({
    ...node,
    status: NODE_STATUS.NEW,
  }))
}

function nodesAreNew() {
  const nodeS = new Node('S')
  const node1 = new Node('1')
  const node2 = new Node('2')
  const node3 = new Node('3')
  const node4 = new Node('4')
  const nodeE = new Node('E')

  // Add connections and references
  nodeS.connections.push(node1)
  nodeS.connections.push(node3)

  node1.connections.push(node2)
  node1.connections.push(node4)

  node2.connections.push(nodeE)
  node2.connections.push(node4)

  node3.connections.push(node1)

  const graph = new Graph()
  graph.nodes.push(nodeS)
  graph.nodes.push(node1)
  graph.nodes.push(node2)
  graph.nodes.push(node3)
  graph.nodes.push(node4)
  graph.nodes.push(nodeE)

  addStatusToNodes(graph)
  for (let i = 0; i < graph.nodes.length; i++) {
    assert.equal(graph.nodes[i].status, NODE_STATUS.NEW)
  }

  assert.equal(nodeS.status, NODE_STATUS.NEW)

  // Start the search for the path from S to E
  const result = canNodeSReachE(graph, nodeS, nodeE)
  assert.equal(result, true)
}
nodesAreNew()
