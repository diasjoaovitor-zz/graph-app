const dfs = (adjacencyList, origin, destination, visited = new Set()) => {
  visited.add(origin)

  const current = adjacencyList.get(origin)

  current.find(node => {
      !visited.has(node) && !visited.has(destination) && dfs(adjacencyList, node, destination, visited)
  })

  return {
    expandedNodes: Array.from(visited),
    isPath: visited.has(destination)
  }
}

export default dfs