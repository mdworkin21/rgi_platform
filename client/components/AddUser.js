import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import '../public/styles/adduser.css'

class AddUser extends Component {
  state = {
    isAdmin: false,
    password: '',
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
          isAdmin: false,
          password: '',
          email: '',
        })
      }
    }catch(err){
      console.log(err)
    }
  }

  render() {
    return (
      <div className="add-container">
      <h1>Add New User</h1>
        <form className="ui form" onSubmit={this.handleSubmit}>
           <input id="add-input-email" type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
           <input id="add-input-password" type="text" name="password" placeholder="Temporary Password" onChange={this.handleChange} value={this.state.password} />
           <div className="ui checkbox">
              <input type="checkbox" name="isAdmin" onClick={() => this.setState({isAdmin: !this.state.isAdmin})} value={this.state.isAdmin}/>
              <label>{'Admin'}</label>
           </div>

        </form>
           <button onClick={this.handleSubmit} className="ui negative button" id="add-btn" type="submit">Add User</button>
      </div>
    )
  }
}

export default AddUser