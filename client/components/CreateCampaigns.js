import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createNewTabCampaign } from '../redux/thunks/campaigns/taboola';
import '../public/styles/createCampaigns.css'


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
        <div className='create-campaign-wrapper'>
          <div className='ui tabular menu create-campaign-menu-wrapper'>
            <a className="active item"> Home </a>
            <button className="item" onClick={this.handleCreateCampaign}> Taboola </button>
            <a className="item"> Outbrain </a>
          </div>
        </div>
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