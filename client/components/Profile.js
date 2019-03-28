import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import {connect} from 'react-redux'
import '../public/styles/authenticate.css'


class Profile extends Component {
  state = {
    userName: '',
    email: '',
    password: '',
    rePassword: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

  }
  async componentDidMount(){
    let user = await axios.get(`/api/userManagement/user/${this.props.id}`)
    console.log("USER", user.data)
    let userInfo = user.data
   this.setState({
     userName: userInfo.userName,
     email: userInfo.email,
   })
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
  console.log('STATE', state, state.user.user.id)
  return {
    id: state.user.user.id
  }
}

export default connect(mapStateToProps)(Profile)