const bfs = (adjacencyList, origin, destination) => {
  const visited = new Set()

  visited.add(origin)

  const queue = [origin]

  let isPath = ''

  let a = adjacencyList.size

  while(queue.length > 0 && a > 0) {
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

    a--
  }

  return {
    expandedNodes: Array.from(visited),
    isPath
  }
}

export default bfs