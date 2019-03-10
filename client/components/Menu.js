import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { removeUser } from '../redux/thunks/users'
import '../public/styles/menu.css'

class Menu extends Component  {
  handleClick = () => {
    this.props.logOutUser()
  }

  menuToDisplay = () => {
    if (this.props.user.loggedIn){
      return (
        <div id="menu-container">
          <h1>RGI Platform</h1>
          <div id="welcome-Msg">{`Welcome, ${this.props.user.user.userName}` }</div>
          <button className="negative ui button" id="logout-Btn"onClick={this.handleClick}>Logout</button>
        </div>
      )
    } else {
      return (
          <div id="menu-container">
           <h1>RGI Platform</h1>
          </div>
      )
    }
  }
 
  render(){
   let menu = this.menuToDisplay()
   return (
     <div>
       {menu}
     </div>
   )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)