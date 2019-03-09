import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logInUser } from '../redux/thunks/users'
import '../public/styles/authenticate.css'

class Login extends Component {
  state ={
    userName: '',
    password: '',
    redirect: false
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
        userName: this.state.userName,
        password: this.state.password
      })
      if (this.props.user.loggedIn){
        this.setState({
          userName: '',
          password: '',
          logInErr: false,
          redirect: true
        })
      }
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
    let logInErr = this.props.user.logInErr ? 'Username or Password Invalid. Please try again.' : ''
    return this.state.redirect ? <Redirect to='/dashboard' /> : (
      <form onSubmit={this.handleSubmit}>
      <div className="right-box">
        <h1 id="loginTitle">Log In</h1>
        <input type="text" className="loginInput" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
        <input type="password" className="loginInput" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
        <div className="err-message">{logInErr}</div>
        <input type="submit" className="loginBtn" name="login-in" value="Log In" />
      </div>
    </form>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (user) => dispatch(logInUser(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)