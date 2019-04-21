import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from './Button'
import { createNewTabCampaign } from '../redux/thunks/campaigns/taboola';
import '../public/styles/dashboard.css'

class Dashboard extends Component {

  handleCreateCampaign = async () => {
    try {
      await this.props.createTabCampaign()
    } catch(err) {
        console.log(err)
    }
  }

  render(){
    return (
      <React.Fragment>
        <Button name={'create campaing'} btnID={'create-campaign-btn'} handleSubmit={this.handleCreateCampaign}/>
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