class Graph {
  constructor() {
    this.nodes = []
  }
}

class Node {
  constructor(name) {
    this.name = name
    this.connections = []
  }
}

// CommonJS module export
module.exports = {
  Graph,
  Node,
}
