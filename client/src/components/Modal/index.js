import React from 'react'

import './style.css'

const Modal = props => {
  const { 
    display, input, button, routes, digraph, cost,
    handleChange, handleDigraph, handleCost
  } = props

  return (
    <div className={`modal ${display}`}>
      <form>
        <h2>Informe as Rotas</h2>
        
        <div className="content">
          <div className="options">
            <label>
              <span>Dígrafo</span>
              <input onChange={handleDigraph} value={digraph ? false : true}type="checkbox"></input>
            </label>
            <label>
              <span>Custo</span>
              <input onChange={handleCost} value={cost ? false : true} type="checkbox"></input>
            </label>
          </div>

          <div className="modal-routes" onChange={handleChange}>
            {input}
            {routes && routes.map(() => input)}
          </div>
          {button}
        </div>
      </form>
    </div>
  )
}

export default Modal