import React from 'react'
// import '../public/styles/button.css'

const Button = (props) => {
  const {name, btnID, handleSubmit} = props
  return (
    <button onClick={handleSubmit} className="ui button" id={btnID}>{name}</button>
  )
}

export default Button

