import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from './Button'
import '../public/styles/dashboard.css'
import { createNewCampaign } from '../redux/thunks/campaigns/taboola';

class Dashboard extends Component {

  handleCreateCampaign = async () => {
    try {
      this.props.createTabCampaign()
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
    createTabCampaign: (name) => dispatch(createNewCampaign(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)