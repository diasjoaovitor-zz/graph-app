const bfs = (adjacencyList, origin, destination) => {
  const visited = new Set()

  visited.add(origin)

  const queue = [origin]

  let isPath = ''

  while(queue.length > 0 && visited.size !== adjacencyList.size) {
    const node = queue.shift()

    const current = adjacencyList.get(node)

    if(!current)
      break

    isPath  = current.find(node => {
      visited.add(node)
      queue.push(node)

      return node === destination
    })

    if(isPath)
      break
  }

  return {
    expandedNodes: Array.from(visited),
    isPath
  }
}

export default bfs