import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CampaignBtns from './CampaignBtns'
import DragDrop from './DragDrop'
import {saveBlocks, clearBlocks, deleteBlock} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/blocks.css'

const blocks = [
  {publisher_id: 'fake_data_1', country: {value: 'All', class: ''}},
  {publisher_id: 'fake_data_2', country: {value: 'All', class: ''}},
  {publisher_id: 'fake_data_3', country: {value: 'All', class: ''}},
  {publisher_id: 'fake_data_4', country: {value: 'All', class: ''}},
  {publisher_id: 'fake_data_5', country: {value: 'All', class: ''}},
  {publisher_id: 'fake_data_6', country: {value: 'All', class: ''}}
]

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

class Blocks extends Component {
  state ={
    blocks: []
  }

  componentDidMount = async () => {
    let blocks = await axios.get('api/dataIngestion/uploadData/getBlocks') 

    let parsedBlocks = blocks.data.map(block => {
      return {
        publisher_id: block.publisher_id,
        country: block.country,
        country_abbr: block.country_abbr
      }
    })

    this.setState({
      blocks: parsedBlocks
    })
  }

  handleSelectCountry = (i) => (event) => {
    let blocks = [...this.state.blocks]
    blocks[i].country = event.target.value
    blocks[i].country_abbr = countries.filter(country => country.country === event.target.value)[0].country_abbr

    this.setState({
      blocks
    })
  }

  handleSave = () => {
    this.props.saveBlocks(this.state.blocks)
  }  

  render(){
    console.log('ASDASD', this.state)
    return(
      <div id='block-component-container'>
        <h1 id='campaign-config-heading'>Bids</h1>
        <div id='block-container'>
        <table className="ui celled table" id="block-table-container">
          <thead >
              <tr className='block-table-header-row'>
                <th id='block-table-head-row-name'>Bid</th>
                <th id='block-table-head-row-checkbox'>Modifier</th>
              </tr>
            </thead>
            <tbody>
              {this.state.blocks.map((block, i) => {
                return (
                  <tr key={`${block.publisher_id}_${block.country}`} className='individual-block'>
                    <td data-label='Block' className='block-name'>{block.publisher_id}</td>
                    <td data-label='Modifier' className='block-checkbox'>
                      <div className='block-table-head-row'>
                        <select type="ui dropdown"
                        value={this.state.blocks[i].country} 
                        onChange={this.handleSelectCountry(i)} 
                        name={block.country}
                        className={`ui selection simple dropdown block-checkbox `} 
                        >{this.state.blocks[i].country}
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

const mapStateToProps = (state) => {
  return {
    admin: state.user.user.isAdmin,
    headlines: state.campaignConfiguration.headlines,
    images: state.campaignConfiguration.images,
    campaignConfiguration: state.campaignConfiguration.campaignConfig,
    blocks: state.campaignConfiguration.blocks
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    saveBlocks: (headlines) => dispatch(saveBlocks(blocks)),
    clearBlocks: () => dispatch(clearBlocks()),
    deleteBlock: (headline) => dispatch(deleteBlock(block)),  
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blocks)