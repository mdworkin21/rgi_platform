import React, {Component} from 'react'
import regeneratorRuntime, { async } from "regenerator-runtime";
import axios from 'axios'
import {connect} from 'react-redux'
import { updateUserInfo } from '../redux/thunks/users';
import {comparePasswords} from "../utilities/formValidator";
import { signUpErr } from '../redux/actions/users';
import ErrModal from './ErrModal'
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
    //First check to make sure password and retyped match
    if (comparePasswords(this.state.password, this.state.repassword)){
      //Then check to make sure password is long enough
      if(this.state.password.length >= 8 || this.state.password === ''){
        try{
          await this.props.updateUserInformation(this.props.id, this.state)
          this.setState({
            password: '',
            repassword: ''
          })
          
        } catch(err){
          console.log(err)
        }

      } else {
        this.props.errMessage('Password must be at least 8 characters long')
        this.setState({
          password: '',
          repassword: ''
        })
      }
    } else {
        this.props.errMessage('Re-entered password does not match password.')
        this.setState({
          password: '',
          repassword: ''
        })
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
    //Weak form of email validation, needs to be made strong
    let isEmail = this.state.email.indexOf('@') !== -1
    //Hides save button so users cannot accidentally (or on purpose) erase their email or username, button only appears when both fields are filled in.
    let hideBtn = this.state.userName !== '' && (this.state.email !== '' && isEmail) ? false : true
    return (
      <React.Fragment>
        {this.props.err ? <ErrModal errors={this.props.errMessages}/> : ''}
        <form  onSubmit={this.handleSubmit} style={{position: 'relative', top: '15vh',left: '38%'}}>
          <div className="left-box">
            <h1>Profile</h1>
            <input type="text" name="userName" placeholder="Username" onChange={this.handleChange} value={this.state.userName} />
            <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
            <input type="password" name="password" placeholder="New Password" onChange={this.handleChange} value={this.state.password} />
            <input type="password" name="repassword" placeholder="Retype New Password" onChange={this.handleChange} value={this.state.repassword} />
            <input hidden={hideBtn} type="submit" name="save-btn" value="Save"/>
          </div>
        </form>  
      </React.Fragment>
    )
  }  
}

const mapStateToProps = (state) => {
  //Note, when you redo reducers, you'll want to change type of err you throw
  return {
    id: state.user.user.id,
    err: state.applicationLevel.logInErr,
    errMessages: state.user.errMsg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInformation: (id, userInfo) => dispatch(updateUserInfo(id, userInfo)),
    errMessage: (msg) => dispatch(signUpErr(msg))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)


//Refactoring note: Might be better to just create a different form validator for this page, since we put a bunch of form validation logic above (we did this b/c we couldn't easily carry over form validation from sign up. Probaly best to refactor, but this works for now)