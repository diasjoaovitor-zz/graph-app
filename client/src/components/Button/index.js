import React from 'react'

import './style.css'

const Button = props => {
  const { label, type, handleChange, handleFile } = props
  
  return (
    <label onClick={handleChange} onChange={handleFile} className="button">
      <span>{label}</span>
      <input className="not-visible" type={type}></input>
    </label>
  )
}

export default Button