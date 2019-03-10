import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

const Dashboard = (props) => {
  return props.user.loggedIn === false ? <Redirect to ='/' /> : (
    <div>REDIRECTED TO THIS PAGE ON LOGIN</div>
  ) 
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
} 

export default connect(mapStateToProps)(Dashboard)