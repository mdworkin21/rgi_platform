import React from 'react'
import {connect} from 'react-redux'

const Menu = (props) => {
  let welcomeMessage = props.user.userName ? `Welcome, ${props.user.userName}` : ''
  return (
    <div id="menu-container">
      <div>MENU</div>
      <div>{welcomeMessage}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(Menu)