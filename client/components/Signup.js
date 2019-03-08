import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import {connect} from 'react-redux'
import { createNewUser, logInUser } from '../redux/thunks/users'
import {
  formValidator,
  checkEachField,
  individualizedErrMsg
} from "../utilities/formValidator";

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

  handleSubmit = async (event) =>{
    event.preventDefault()
    if (checkEachField(formValidator, this.state).length < 1) {
    try{
      await this.props.createUser({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password
      })
      this.setState({
        userName: '',
        email: '',
        password: '',
        repassword: ''
      }) 
    } catch(err){
        console.log(err)
    }  
  } else {
    const messages = individualizedErrMsg(
      checkEachField(formValidator, this.state)
    );
    const finalMessage = this.displayErrMessages(messages)
    //Placeholder for now
    alert(finalMessage)
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createNewUser(user)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)