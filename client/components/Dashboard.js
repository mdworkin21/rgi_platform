import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { createNewTabCampaign } from '../redux/thunks/campaigns/taboola';
import '../public/styles/dashboard.css'

class Dashboard extends Component {
  render(){
    return (
      <React.Fragment>
        <div id='dashboard-container'>REDIRECTED TO THIS PAGE ON LOGIN</div>
      </React.Fragment>
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
    createTabCampaign: (name) => dispatch(createNewTabCampaign(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)