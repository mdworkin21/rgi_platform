import React, {Component} from 'react'
import CampaignBtns from './CampaignBtns'


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
    fake_data_1: false,
    fake_data_2: false,
    fake_data_3: false,
    fake_data_4: false,
    fake_data_5: false,
    fake_data_6: false
  }

  render(){
    return(
      <div id='bid-component-container'>
        <div id='bid-container'>
          {bids.map(bid => {
            console.log('DID IT HAPPEN???', bid.name, bid.allowed)
            return (
              <div key={bid.name} className='individual-bid'>
                <h2>{bid.name}</h2>
                <input type="checkbox"
                checked={this.state[bid.name]} />
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