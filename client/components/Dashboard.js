import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import '../public/styles/dashboard.css'

const Dashboard = (props) => {
  return (
    <div id='dashboard-container'>REDIRECTED TO THIS PAGE ON LOGIN</div>
  ) 
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
} 

export default connect(mapStateToProps)(Dashboard)