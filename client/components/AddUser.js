import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'

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
      <div>
        <form className="ui form" style={{position: 'relative', top: '150px', left: '30%', width: '300px'}} onSubmit={this.handleSubmit}>
           <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
           <input type="text" name="code" placeholder="Sign up code" onChange={this.handleChange} value={this.state.code} />
           {roles}
           <input type="submit" name="signup-btn" value="Sign Up"/>
        </form>
      </div>
    )
  }
}


export default AddUser