import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import '../public/styles/menu.css'

const Navigatelink = (props) => {
  return (
      <NavLink id="menu-links" to={props.to}>{props.name}</NavLink>
  )
}

export default Navigatelink