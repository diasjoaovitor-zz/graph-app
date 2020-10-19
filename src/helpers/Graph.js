import bfs from './algorithms/bfs'
import dfs from './algorithms/dfs'

class Graph {
  constructor(routes, cost, isDigraph, algorithm) {
    this.routes = routes
    this.isDigraph = isDigraph
    this.cost = cost
    this.algorithm = algorithm

    this.nodes = []
    this.adjacencyList = new Map()

    this.path = []

    this.init()
  }

  init() {
    const distinguishedNodes = new Set()

    this.routes.forEach(([ a, b ]) => {
      distinguishedNodes.add(a)
      distinguishedNodes.add(b)
    })

    this.nodes = Array.from(distinguishedNodes)

    this.nodes.forEach(node => this.adjacencyList.set(node, []))

    this.routes.forEach(([a, b]) => {
      this.adjacencyList.get(a).push(b)
      !this.isDigraph && this.adjacencyList.get(b).push(a)
    })

    this.nodes = this.nodes.filter(node => node)
  }

  draw() {
    const nodes = this.nodes.map(node => {
        return { id: node, label: node }
    })

    const edges = this.routes.map((route, index) => {
      return { 
        source: route[0], 
        target: route[1],
        label: !this.cost ? '' : this.cost[index]
      }
    })
    
    const data = {
      nodes,
      edges
    }

    return data
  }

  calculatePath(nodes, origin, destination, visited = new Set()) {
    visited.add(origin)

    const current = this.adjacencyList.get(origin).reverse()

    nodes.find(node => {
      return current.find(next => {
        return node === next && !visited.has(node) && origin !== destination && this.calculatePath(nodes, node, destination, visited)
      })
    })

    return Array.from(visited)
  }

  calculateCost() {
    let cost = 0

    this.cost && this.path.forEach((node, index) => {
      if(index > 0) {
        const last = this.path[index - 1]

        const route = this.routes.find(([ a, b ]) => a === last && b === node)
              
        const position = this.routes.indexOf(route)

        cost += this.cost[position]
      }
    })

    return cost
  }

  start(origin, destination) {
    let data = {}

    switch(this.algorithm) {
      case 'bfs':
        data = bfs(this.adjacencyList, origin, destination)
        break
      case 'dfs':
        data = dfs(this.adjacencyList, origin, destination)
        break
      default:
        return
    }
   
    const { expandedNodes, isPath } = data

    if(isPath) {
      const nodes = this.algorithm === 'dfs'
        ? [...expandedNodes]
        : [...dfs(this.adjacencyList, origin, destination).expandedNodes]

      nodes.reverse()

      this.path = this.calculatePath(nodes, origin, destination)

      data = {
        ...data,
        path: this.path,
        totalCost: this.calculateCost()
      }
    }

    return data
  }
}

export default Graph