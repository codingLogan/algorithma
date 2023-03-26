class Graph {
  constructor() {
    this.nodes = []
  }
}

class Node {
  constructor(name) {
    this.name = name
    this.status = 1
    this.connections = []
  }
}

// CommonJS module export
module.exports = {
  Graph,
  Node,
}
