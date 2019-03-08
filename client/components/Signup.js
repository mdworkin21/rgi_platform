import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";


class Signup extends Component {
  state ={
    userName: '',
    email: '',
    password: '',
    repassword: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefalt()

  }

  render(){
    return (
      <form  onSubmit={this.handleSubmit}>
        <div className="left-box">
          <h1>Sign Up</h1>
          <input type="text" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
          <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
          <input type="password" name="repassword" placeholder="Retype Password" onChange={this.handleChange} value={this.state.repassword} />
          <input type="submit" name="signup-btn" value="Sign Up"/>
        </div>
      </form>    
    )
  }
}

export default Signup