import React, {Component} from 'react'
import CampaignBtns from './CampaignBtns'
import '../public/styles/bids.css'

const bids = [
  {name: 'fake_data_1', allowed: true},
  {name: 'fake_data_2', allowed: true},
  {name: 'fake_data_3', allowed: true},
  {name: 'fake_data_4', allowed: true},
  {name: 'fake_data_5', allowed: true},
  {name: 'fake_data_6', allowed: true}
]

class Bids extends Component {
  state ={
    fake_data_1: true,
    fake_data_2: true,
    fake_data_3: true,
    fake_data_4: true,
    fake_data_5: true,
    fake_data_6: true
  }

  handleCheckBox = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  render(){
    return(
      <div id='bid-component-container'>
        <h1 id='campaign-config-heading'>Bids</h1>
        <div id='bid-container'>
          {bids.map(bid => {
            return (
              <div key={bid.name} className='individual-bid'>
                <p>{bid.name}</p>
                <input type="checkbox"
                checked={this.state[bid.name]} 
                onChange={this.handleCheckBox} 
                className='ui checkbox bid-checkbox'
                name={bid.name}
                />
              </div>
            )
          })}
        </div>

        <CampaignBtns 
        handleSubmitCampaign={this.handleSubmitCampaign}
        handleSave={this.handleSave} 
        handleClear={this.handleClear} 
        link1={'/creatives'} 
        link2={'/create-campaigns'}
        pageName1={'Creatives'} 
        pageName2={'Campaigns'}
        styleClass={'button-container'}
      />
      </div>
    )
  }
}

export default Bids 