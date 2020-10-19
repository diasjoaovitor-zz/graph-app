import React from 'react'

import './style.css'

const Output = props => {
  const { label, value } = props

  return (
    <div className="output">
      <span>{label}</span>
      <output>{value}</output>
    </div>
  )
}

export default Output