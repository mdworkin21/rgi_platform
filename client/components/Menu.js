import React, {Component} from 'react'
import {connect} from 'react-redux'
import { removeUser } from '../redux/thunks/users'
import Navigatelink from './NavigateLink'
import '../public/styles/menu.css'

const dropMenuConfig = {
  admin : [
      {to: '/manageusers', id: 'manage-users', name: 'Manage Users', icon: 'big users icon link icon'},
      {to: '/adduser', id: 'add-user', name: 'Add User', icon: 'big add user basic icon'},
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
          <h1 id="title">RGI</h1>
          <div className= 'nav-link-container'>
            {dropMenuConfig.admin.map(el => {
              return <Navigatelink key={el.id} to={el.to} name={el.name} id="menu-links" icon={el.icon}/>
            })
            }
          </div> 
            <button className="ui button" id="logout-btn" onClick={this.handleLogOut}>Logout</button>
          </div>
      )
    } else if (this.props.user.loggedIn){
        return (
          <div id="menu-container">
            <h1>RGI</h1>
            <div className= 'nav-link-container'>
              {dropMenuConfig.loggedIn.map(el => {
                 return <Navigatelink key={el.id} to={el.to} name={el.name} id="menu-links"/>
                })
               }
          </div>
            <button className="ui button" id="logout-btn" onClick={this.handleLogOut}>Logout</button>
            </div>
      )
    } else {
      return (
          <div id="menu-container">
           <h1>RGI</h1>
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