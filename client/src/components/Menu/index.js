import React from 'react' 

import './style.css'

const Menu = props => {
  const { create, modal, upload, handleChange } = props

  return (
    <div className="menu">
      <ul>
        <li>
          {create}
          {modal}
        </li>
        <li>
          {upload}
        </li>
      </ul>

      <ul>
        <li>
          <select onChange={handleChange}>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
          </select>
        </li>
        <li>
          <span>Instruções</span>
        </li>
      </ul>
    </div>
  )
}

export default Menu