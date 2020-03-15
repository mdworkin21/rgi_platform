import React, {Component} from 'react'
import {connect} from 'react-redux'
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
  {value: 'All', class: ''},
  {value: 'Afghanistan', class: 'af'},
  {value: 'Aland Islands', class: 'ax'},
  {value: 'Albania', class: 'al'},
  {value: 'Algeria', class: 'dz'},
  {value: 'American Samoa', class: 'as'},
  {value: 'Andorra', class: 'ad'},
  {value: 'Angola', class: 'ao'},
  {value: 'Anguilla', class: 'ai'},
  {value: 'Antigua', class: 'ag'}
]

class Blocks extends Component {
  state ={
    blocks: [{publisher_id: '', country: {value: '', class:''}}]
  }

  componentDidMount = () => {
    let temporaryBlocks = blocks

    this.setState({
      blocks: temporaryBlocks
    })
  }

  handleSelectCountry = (i) => (event) => {
    let blocks = [...this.state.blocks]
    blocks[i].country.value = event.target.value
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
        <DragDrop />
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
                  <tr key={block.publisher_id} className='individual-block'>
                    <td data-label='Block' className='block-name'>{block.publisher_id}</td>
                    <td data-label='Modifier' className='block-checkbox'>
                      <div className='block-table-head-row'>
                        <select type="ui dropdown"
                        value={this.state.blocks[i].country.value} 
                        onChange={this.handleSelectCountry(i)} 
                        name={block.country.value}
                        className={`ui selection simple dropdown block-checkbox `} 
                        >
                        {countries.map((nation) => {
                          return (
                            <option 
                              name={nation.value} 
                              value={nation.value} 
                              key={nation.value} 
                            >{nation.value}</option>
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