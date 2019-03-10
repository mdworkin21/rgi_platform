import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { removeUser } from '../redux/thunks/users'

class Menu extends Component  {
  handleClick = () => {
    this.props.logOutUser()
  }

  menuToDisplay = () => {
    if (this.props.user.loggedIn){
      return (
        <div id="menu-container">
          <div>MENU</div>
          <div>{`Welcome, ${this.props.user.user.userName}` }</div>
          <button onClick={this.handleClick}>Logout</button>
        </div>
      )
    } else {
      return (
          <div id="menu-container">
            <div>MENU</div>
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