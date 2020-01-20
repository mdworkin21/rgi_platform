import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { createCampaignArray } from '../utilities/createCampaignConfig'
import {NavLink} from 'react-router-dom'
import '../public/styles/creativeAssets.css'
import '../public/styles/newCampaign.css'


const campaignType = [
  'ob_tag_enabled',
  'type_taboola_desktop',
  'type_taboola_mobile',
  'type_taboola_desktop_safe',
  'type_taboola_mobile_safe',
  'type_outbrain_desktop',
  'type_outbrain_mobile',
  'type_outbrain_desktop_msn',
  'type_outbrain_desktop_premium',
  'type_outbrain_mobile_premium'
]

const campaignConfiguration = [
  'campaign_name',
  'url',
  'ob_tag',
  'cpc_taboola_desktop',
  'cpc_taboola_mobile',
  'cpc_outbrain_desktop',
  'cpc_outbrain_mobile',
  'daily_cap_taboola',
  'daily_cap_outbrain'
]

class NewCampaign extends Component {
  state = {
      campaign_name: '',
      url: '',
      ob_tag: '',
      cpc_taboola_desktop: '',
      cpc_taboola_mobile: '',
      cpc_outbrain_desktop: '',
      cpc_outbrain_mobile: '',
      daily_cap_taboola: '',
      daily_cap_outbrain: '',
      ob_tag_enabled: false,
      type_taboola_desktop: false,
      type_taboola_mobile: false,
      type_taboola_desktop_safe: false,
      type_taboola_mobile_safe: false,
      type_outbrain_desktop: false,
      type_outbrain_mobile: false, 
      type_outbrain_desktop_msn: false,
      type_outbrain_desktop_premium: false,
      type_outbrain_mobile_premium: false,
      headlineValue: '',
      imageValue: '',
      headlines: [],
      images: []
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //This will be async
  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let data = createCampaignArray(this.state)
      let creatives = {
        images: this.state.images,
        headlines: this.state.headlines
      }

      console.log('DATA', data)
      let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', {data, creatives})
    } catch(e){}
  }

  handleCheckBox = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  handleAddImageHeadline = (event) => {
    event.preventDefault()
    if (event.target.name === 'headline'){
      this.setState({
        headlines: [...this.state.headlines, this.state.headlineValue],
        headlineValue: ''
      })
    } else if (event.target.name === 'image'){
      this.setState({
        images: [...this.state.images, this.state.imageValue],
        imageValue: ''
      })
    }
  }

  render(){
    console.log("ASDSAD", this.state)
    return (
      <div className='form-container'>
        <form onSubmit={this.handleSubmit} id='campaign-configuration'>
          <div>Media Buyer:</div>
          {campaignConfiguration.map(config => {
            return(
              <input 
              key={config}
              type='text' 
              name={config}
              value={this.state.config} 
              placeholder={config}
              onChange={this.handleChange}/>
            )
          })}
        </form>

        <form id='campaign-type' onSubmit={this.handleSubmit}>
        {campaignType.map(type => {
          return (
            <div key={type} className='ui checkbox'>
              <input 
              type='checkbox'
              name={type}
              value={this.state[type]}
              onChange={this.handleCheckBox}
              />
              <label>{type}</label>
            </div>
            )
          })
        }
        <button type='submit' id='campaign-submit-btn'>SUBMIT</button>
        </form>  


        <div id='creative-assets-container'>
        {/* <NavLink to='create-campaigns'>CLICK TO MOVE BACK</NavLink> */}
          <input 
            type='text' 
            name='headlineValue'
            value={this.state.headlineValue} 
            placeholder= 'Headline'
            onChange={this.handleChange}/>
           <button onClick={this.handleAddImageHeadline} name='headline'> Add Headline </button>

          <input 
            type='text' 
            name='imageValue'
            value={this.state.imageValue} 
            placeholder='Image Url'
            onChange={this.handleChange}
            />

            <button onClick={this.handleAddImageHeadline} name='image'>ADD Image</button> 
      </div>
      {/* <NavLink to='/creatives'>CLICK TO MOVE ON</NavLink> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.user.user.isAdmin
  }
}

export default connect(mapStateToProps)(NewCampaign)