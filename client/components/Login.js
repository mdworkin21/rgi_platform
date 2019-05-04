import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logInUser } from '../redux/thunks/users'
import '../public/styles/authenticate.css'

class Login extends Component {
  state ={
    email: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await this.props.logInUser({
        email: this.state.email,
        password: this.state.password
      })
    }catch(err){
      console.log(err.status)
      console.log(err)
    }
  }

  displayErrMessages(messages){
    let finalMessage = ''
    for (let i = 0; i < messages.length; i++){
      finalMessage += `${i + 1}. ${messages[i]} ${'\n'}`
    }
      return finalMessage
    }

  render(){
    return this.props.user.loggedIn ? <Redirect to='/dashboard' /> : (
      <form onSubmit={this.handleSubmit}>
      <div className="right-box">
        <h1 id="loginTitle">Log In</h1>
        <input type="text" className="loginInput" name="email" placeholder="email" onChange={this.handleChange} value={this.state.email} />
        <input type="password" className="loginInput" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
        <input type="submit" className="loginBtn" name="login-in" value="Log In" />
      </div>
    </form>
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
    logInUser: (user) => dispatch(logInUser(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)