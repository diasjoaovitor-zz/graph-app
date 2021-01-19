import React from 'react'

import './style.css'

const Input = props => {
  const { handleOrigin, handleDestination, cost } = props

  return (
    <div className="input">
      <input onChange={handleOrigin} type="text" placeholder="Origem"></input>
      <input onChange={handleDestination} type="text" placeholder="Destino"></input>
      {cost && <input type="text" placeholder="Custo"></input>}
    </div>
  )
}

export default Input