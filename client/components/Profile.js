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
    repassword: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try{
      let updatedUser = await axios.put(`/api/userManagement/user/${this.props.id}`, this.state)
      if (updatedUser.status === 202){
        this.setState({
          password: '',
          repassword: ''
        })
      }
    } catch(err){
      console.log(err)
    }
  }

  async componentDidMount(){
    try{
      const user = await axios.get(`/api/userManagement/user/${this.props.id}`)
      const userInfo = user.data
      this.setState({
        userName: userInfo.userName,
        email: userInfo.email,
      })
    }catch(err){
      console.log(err)
    }
  }

  render(){
    return (
      <form  onSubmit={this.handleSubmit} style={{position: 'relative', top: '15vh',left: '38%'}}>
      <div className="left-box">
        <h1>Profile</h1>
        <input type="text" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
        <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
        <input type="password" name="repassword" placeholder="Retype Password" onChange={this.handleChange} value={this.state.repassword} />
        <input type="submit" name="save-btn" value="Save"/>
      </div>
    </form>  
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    id: state.user.user.id
  }
}

export default connect(mapStateToProps)(Profile)