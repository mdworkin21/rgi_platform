import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { removeUser } from '../redux/thunks/users'
import '../public/styles/menu.css'

class Menu extends Component  {
  handleClick = () => {
    this.props.logOutUser()
  }

  menuToDisplay = () => {
    if (this.props.admin){
      return (
        <div id="menu-container">
          <h1 id="title">RGI Platform</h1>
          <div id="welcome-Msg">{`Welcome, ${this.props.user.user.userName}` }</div>
          <NavLink to='/manageusers' id='manage-users'>Manage Users</NavLink>
          <NavLink to='/adduser' id='manage-users'>Add User</NavLink>

          <button className="negative ui button" id="logout-Btn"onClick={this.handleClick}>Logout</button>
        </div>
      )
    } else if (this.props.user.loggedIn){
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
    user: state.user,
    admin: state.user.user.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)