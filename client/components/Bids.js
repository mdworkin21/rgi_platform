import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CampaignBtns from './CampaignBtns'
import DragDrop from './DragDrop'
import {saveBids, clearBids, deleteBid} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/bids.css'
import { getAllBids } from '../redux/thunks/campaigns/campaignConfiguration'

const countries = [
  {country: 'All', country_abbr: ''},
  {country: 'Austrailia', country_abbr: 'AU'},
  {country: 'Brazil', country_abbr: 'BR'},
  {country: 'Canada', country_abbr: 'CA'},
  {country: 'France', country_abbr: 'FR'},
  {country: 'Germany', country_abbr: 'DE'},
  {country: 'Ghana', country_abbr: 'GH'},
  {country: 'Ireland', country_abbr: 'IE'},
  {country: 'India', country_abbr: 'IN'},
  {country: 'Italy', country_abbr: 'IT'},
  {country: 'Japan', country_abbr: 'JP'},
  {country: 'Mexico', country_abbr: 'MX'},
  {country: 'Neatherlannds', country_abbr: 'NL'},
  {country: 'New Zealand', country_abbr: 'NZ'},
  {country: 'Poland', country_abbr: 'PL'},
  {country: 'Singapore', country_abbr: 'SG'},
  {country: 'South Africa', country_abbr: 'ZA'},
  {country: 'Spain', country_abbr: 'ES'},
  {country: 'Sweden', country_abbr: 'SE'},
  {country: 'United Kingdom', country_abbr: 'UK'},
  {country: 'United States', country_abbr: 'US'}
]

class Bids extends Component {
  state ={
    bids: []
  }

  componentDidMount = async () => {
    let bids

    if (this.props.bids.length > 1){
      bids = this.props.bids
    } else {
      await this.props.getBids()
    }

    bids = this.props.bids.map(bid => {
      return {
        publisher_id: bid.publisher_id,
        country: bid.country,
        country_abbr: bid.country_abbr
      }
    })

    this.setState({
      bids: bids
    })
  }

  handleSelectCountry = (i) => (event) => {
    let bids = [...this.state.bids]
    bids[i].country = event.target.value
    bids[i].country_abbr = countries.filter(country => country.country === event.target.value)[0].country_abbr

    this.setState({
      bids
    })
  }

  handleSave = () => {
    this.props.saveBids(this.state.bids)
  }  

  renderBidTable = () => {
    return (
      <table className="ui celled table" id="bid-table-container" >
          <thead>
            <tr>
              <th colSpan="6" className='center aligned' id='bid-table-header'>Taboola</th>
            </tr>
            <tr>
              <th colSpan="1" className='center aligned' id='bid-table-header'>Publisher ID</th>
              <th colSpan="1" className='center aligned' id='bid-table-header'>Country</th>
              <th colSpan="1" className='center aligned' id='bid-table-header'>Blocks</th>
              <th colSpan="1" className='center aligned' id='bid-table-header'>Enabled</th>
            </tr>
          </thead>
          <tbody id="table-body">
          {this.state.bids.map((bid, i) => {
              return (
                  <tr key={`${bid.publisher_id}_${bid.country}`} className='individual-bid'>
                    <td data-label='Bid' className='bid-name left aligned'>{bid.publisher_id}</td>
                    <td data-label='Modifier' className='bid-checkbox right aligned'>
                      <select type="ui dropdown"
                      value={this.state.bids[i].country} 
                      onChange={this.handleSelectCountry(i)} 
                      name={bid.country}
                      className={`ui selection simple dropdown bid-checkbox `} 
                      >{this.state.bids[i].country}
                      {countries.map((nation) => {
                        return (
                          <option 
                            name={nation.country} 
                            value={nation.country} 
                            key={nation.country} 
                          >{nation.country}</option>
                        )
                      })} 
                      </select>
                    <label></label>
                  </td>
                  <td>{i}</td>
                  <td>
                    <input type='checkbox'/>
                    <label></label>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
      </table>
    )
  }

  render(){
    console.log('ASDASD', this.state)
    return(
      <div id='bid-component-container'>
        <h1 id='campaign-config-heading'>Bids</h1>
        <div id='bid-container'>
          {this.renderBidTable()}
        </div>

        <CampaignBtns 
        handleSubmitCampaign={this.handleSubmitCampaign}
        // handleSave={this.props.saveBids} 
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

const mapStateToProps = (state) => {
  return {
    admin: state.user.user.isAdmin,
    headlines: state.campaignConfiguration.headlines,
    images: state.campaignConfiguration.images,
    campaignConfiguration: state.campaignConfiguration.campaignConfig,
    bids: state.campaignConfiguration.bids
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    getBids: () => dispatch(getAllBids()),
    saveBids: (bids) => dispatch(saveBids(bids)),
    clearBids: () => dispatch(clearBids()),
    deleteBid: (bid) => dispatch(deleteBid(bid)),  
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bids)