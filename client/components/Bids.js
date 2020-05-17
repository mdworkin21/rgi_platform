import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CampaignBtns from './CampaignBtns'
import DragDrop from './DragDrop'
import {saveBids, clearBids, deleteBid, updateCountryInBid} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/bids.css'
import { getAllBids, getAllCountries, addSingleCountry, addPublisher } from '../redux/thunks/campaigns/campaignConfiguration'
import AddBidData from './AddBidData'

class Bids extends Component {
  state ={
    bids: [],
    countries: [],
    //New Publisher
    publisherId: '',
    publisherCountry: '',
    publisherCountryAbbr: '',
    publisherBlocks: 0,
    publisherEnabled: false,
    //New Country
    newCountryName: '',
    newCountryTabCode: '',
    newCountryObCode: '',
    newCountryYahooCode: '',
    newCountryRcCode: ''
  }

  componentDidMount = async () => {
    let bids
    let countries

    if (this.props.bids.length > 1){
      bids = this.props.bids
      countries = this.props.countries
    } else {
      await this.props.getBids()
      await this.props.getCountries()

    }

    bids = this.props.bids.map(bid => {
      return {
        publisher_id: bid.publisher_id,
        country: bid.country,
        country_abbr: bid.country_abbr,
        blocks: bid.blocks,
        enabled: bid.enabled
      }
    })

    countries = this.props.countries.map(country => {
      return {
        country: country.country,
        taboola_country_code: country.taboola_country_code,
        outbrain_country_code: country.outbrain_country_code
      }
    })

    this.setState({
      bids: bids,
      countries: countries
    })
  }

  handleChange = (event) => {  

    if (event.target.type === 'checkbox'){
      console.log('CHANGE', event.target.name)
      this.setState({
        [event.target.name]: !this.state[event.target.name]
      })
    } else {
        this.setState({
          [event.target.name]: event.target.value     
        })
    }
  }

  handleBidEnabled = (i) => (event) => {
    let bids = [...this.state.bids]
    bids[i].enabled = !bids[i].enabled

    //NEED TO UPDATE REDUX AND THEN SET STATE SAME AS COUNTRY

    this.setState({
      bids: bids
    })
  }
  
  handleSave = () => {
    this.props.saveBids(this.state.bids)
  }  

  handleSelectCountry = (i) => (event) => {
    let bids = [...this.state.bids]
    bids[i].country = event.target.value
    bids[i].country_abbr = this.state.countries.filter(country => country.country === event.target.value)[0].taboola_country_code

    this.props.updateBidCountry(bids[i])

    this.setState({
      bids: this.props.bids
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const newPublisher = {
        publisher_id: this.state.publisherId,
        country: this.state.publisherCountry,
        country_abbr: this.state.publisherCountryAbbr,
        blocks: this.state.publisherBlocks,
        enabled: this.state.publisherEnabled,
    }
    const newCountry = {
      country: this.state.newCountryName,
      taboola_country_code: this.state.newCountryTabCode,
      outbrain_country_code: this.state.newCountryObCode,
      yahoo_country_code: this.state.newCountryYahooCode,
      rev_content_country_code: this.state.newCountryRcCode
    }
    
  
    if (newPublisher.publisher_id){
      await this.props.addPublisher(newPublisher)
    }

    if(newCountry.country){
      await this.props.addCountry(newCountry)
    }

    let bids = await this.props.bids
    let countries = await this.props.countries

    //NEED TO UPDATE THE NEW PUBLISHER
    this.setState({
      bids: bids,
      countries: countries,
      //New Publisher
      publisherId: '',
      publisherCountry: '',
      publisherCountryAbbr: '',
      publisherBlocks: 0,
      publisherEnabled: false,
      //New Country
      newCountryName: '',
      newCountryTabCode: '',
      newCountryObCode: '',
      newCountryYahooCode: '',
      newCountryRcCode: ''
    })

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
                      defaultValue={this.state.bids[i].country} 

                      onChange={this.handleSelectCountry(i)} 
                      name={bid.country}
                      className={`ui selection simple dropdown bid-checkbox `} 
                      >
                      {this.state.countries.map((nation) => {
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
                  <td>{bid.blocks}</td>
                  <td>
                    <input 
                      className='ui checkbox'
                      onChange={this.handleBidEnabled(i)} 
                      type='checkbox' 
                      checked={bid.enabled}
                    />
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
    console.log('STATE: ', this.state)
    return(
      <div id='bid-component-container'>
        <h1 id='bids-config-heading'>Bids</h1>
        <AddBidData 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          bidState={this.state} 
          newCountry={this.state.newCountry} 
        />

        <div id='bid-container'>
          {this.renderBidTable()}
        </div>

       
        <CampaignBtns 
          handleSubmitCampaign={this.handleSubmitCampaign}
          // handleSave={this.props.saveBids} 
          handleClear={this.handleClear} 
          link1={'/creatives'} 
          link2={'/new-campaign'}
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
    bids: state.campaignConfiguration.bids,
    countries: state.campaignConfiguration.countries
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    addPublisher: (bid) => dispatch(addPublisher(bid)),
    getBids: () => dispatch(getAllBids()),
    saveBids: (bids) => dispatch(saveBids(bids)),
    clearBids: () => dispatch(clearBids()),
    deleteBid: (bid) => dispatch(deleteBid(bid)),
    addCountry: (country) => dispatch(addSingleCountry(country)),  
    updateBidCountry: (bid) => dispatch(updateCountryInBid(bid)),
    getCountries: () => dispatch(getAllCountries())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bids)