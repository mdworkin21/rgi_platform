import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";


class Login extends Component {
  state ={
    userName: '',
    password: '',
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
    console.log(this.props.handleChange, this.state)
    return (
      <form onSubmit={this.props.handleLogin}>
      <div className="right-box">
        <h1 id="loginTitle">Log In</h1>
        <input type="text" className="loginInput" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
        <input type="password" className="loginInput" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
        {/* <div className="err-message">{logInErr}</div> */}
        <input type="submit" className="loginBtn" name="login-in" value="Log In" />
      </div>
    </form>
    )
  }
}

export default Login