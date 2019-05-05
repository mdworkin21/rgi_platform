import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { removeUser } from '../redux/thunks/users'
import Dropdown from './Dropdown'
import '../public/styles/menu.css'
import ManageUsers from './ManageUsers';

const dropMenuConfig = {
  admin : [
      {to: '/manageusers', id: 'manage-users', name: 'Manage Users'},
      {to: '/adduser', id: 'add-user', name: 'Add User'},
      {to: '/profile', id: 'profile', name: 'Profile'},
      {to: '/create-campaigns', id: 'create-campaigns', name: 'Create Campaigns'}
    ],
  loggedIn: [
    {to: '/profile', id: 'profile', name: 'Profile'},
    {to: '/create-campaigns', id: 'create-campaigns', name: 'Create Campaigns'}

  ]
}

class Menu extends Component  {
  handleLogOut = () => {
    this.props.logOutUser()
  }

  menuToDisplay = () => {
    if (this.props.admin){
      return (
        <div id="menu-container">
          <h1 id="title">RGI Platform</h1>
          <Dropdown 
            email={this.props.user.user.email} 
            list={dropMenuConfig.admin} 
            handleLogOut={this.handleLogOut}
          />
        </div>
      )
    } else if (this.props.user.loggedIn){
        return (
          <div id="menu-container">
            <h1>RGI Platform</h1>
            <Dropdown 
              email={this.props.user.user.email} 
              list={dropMenuConfig.loggedIn} 
              handleLogOut={this.handleLogOut}
            />
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