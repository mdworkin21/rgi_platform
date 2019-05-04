import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import '../public/styles/dropdown.css'

class Dropdown extends Component {
  state = {
    isActive: false
  }
  handleClick = (event) => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render(){
    let toggleDropDown = this.state.isActive ? 'dropdown-content show' : 'dropdown-content'
    return (
      <div className="dropdown">
        <button className="dropbtn" onClick={this.handleClick}>
          <i className="large user circle icon" />
          {this.props.email}
        </button>
        <div className={toggleDropDown}>
          {this.props.list && this.props.list.map(link => {
            return <div 
                    onClick={this.handleClick}
                    key={link.name} 
                    className="link">
                    <NavLink to={link.to}>{link.name} </NavLink>
                   </div>
          })}
          <div>
            <button className="ui negative button" id="logout-Btn" onClick={this.props.handleLogOut}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Dropdown