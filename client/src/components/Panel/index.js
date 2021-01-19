import React from 'react'

import './style.css'

const Panel = props => {
  const { image, input, button, data, draw } = props

  return (
    <div className="panel">
      <div className="graph">
        {!data && <img src={image} alt="ícone img"></img>}
        {data && draw}
      </div>

      <form>
        <h2>Informe o Caminho</h2>

        {input}
        {button}
      </form>
    </div>
  )
}

export default Panel