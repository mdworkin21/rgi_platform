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
        <table className="ui celled table" id="bid-table-container">
          <thead >
              <tr className='bid-table-header-row'>
                <th id='bid-table-head-row-name'>Bid</th>
                <th id='bid-table-head-row-checkbox'>On/Off</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(bid => {
                return (
                  <tr key={bid.name} className='individual-bid'>
                    <td data-label='Bid' className='bid-name'>{bid.name}</td>
                    <td data-label='On/Off' className='bid-checkbox'>
                      <div className='bid-table-head-row'>
                        <input type="checkbox"
                        checked={this.state[bid.name]} 
                        onChange={this.handleCheckBox} 
                        className='ui checkbox bid-checkbox'
                        name={bid.name}
                        />
                      </div>
                      <label></label>
                    </td>
                  </tr>
                )
              })}
          </tbody>
          </table>
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