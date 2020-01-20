import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createNewTabCampaign } from '../redux/thunks/campaigns/taboola';
import '../public/styles/dashboard.css'
import {getUserFromPassport} from '../redux/thunks/users'

class Dashboard extends Component {
  componentDidMount = async () => {
    await this.props.setUser()
   }

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
    createTabCampaign: (name) => dispatch(createNewTabCampaign(name)),
    setUser: () => dispatch(getUserFromPassport())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)