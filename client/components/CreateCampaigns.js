import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createNewTabCampaign } from '../redux/thunks/campaigns/taboola';
import '../public/styles/createCampaigns.css'
import NewCampaign from './NewCampaign'

class CreateCampaigns extends Component {

  //This handler, and jsx below is just a placeholder
  //Replace with components/buttons/logic to implement flow
  handleCreateCampaign = async () => {
    try {
      await this.props.createTabCampaign()
    } catch(err) {
        console.log(err)
    }
  }

  render(){
    return (
        <NewCampaign />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaigns)