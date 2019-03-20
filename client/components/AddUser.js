import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import '../public/styles/adduser.css'

const roles = ['admin', 'mediaBuyer', 'analytics']

class AddUser extends Component {
  state = {
    role: '',
    code: '',
    email: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let newUser = await axios.post('api/userManagement/admin/newSignup', this.state)
      if (newUser.status === 201){
        this.setState({
          role: '',
          code: '',
          email: '',
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  displayRoles = () => {
    return roles.map(el => {
      return (
        <div className="ui radio checkbox" key={el}>
        <input type="radio" name="role" onChange={() => this.setState({role: el})} value={this.state.role}/>
        <label>{el}</label>
      </div>
      )
    })
  }

  render() {
    const roles = this.displayRoles(roles)
    return (
      <div className="add-container">
      <h1>Add New User</h1>
        <form className="ui form" onSubmit={this.handleSubmit}>
           <input id="add-input-email" type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
           <input id="add-input-signupCode" type="text" name="code" placeholder="Sign up code" onChange={this.handleChange} value={this.state.code} />
           {roles}
        </form>
           <button onClick={this.handleSubmit} className="ui negative button" id="add-btn" type="submit">Add User</button>
      </div>
    )
  }
}


export default AddUser