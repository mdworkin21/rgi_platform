import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import '../public/styles/newCampaign.css'
import {saveCampaignSettings, clearCampaignSettings} from '../redux/actions/campaigns/campaignConfiguration'
import CampaignBtns from './CampaignBtns'
import {campaignValidator} from  '../utilities/formValidator'

const campaignType = [
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
  'cpc_taboola_desktop',
  'cpc_taboola_mobile',
  'daily_cap_taboola',
  'cpc_outbrain_desktop',
  'cpc_outbrain_mobile',
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
    type_outbrain_mobile_premium: false
  }

  componentDidMount = () => {
    const campaignConfig = this.props.campaignConfig
    this.setState(campaignConfig)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave = () => {
      this.props.saveCampaignConfig(this.state)
      // await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', this.state)
  }

  handleClear = async () => {
    await this.props.clearCampaignConfig()
    const campaignConfig = this.props.campaignConfig
    this.setState(campaignConfig)
  }

  handleCheckBox = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  handleSubmitCampaign = async (event) => {
    try {
      event.preventDefault()
      //Compile campaign object
      let campaignConfig= this.props.campaignConfiguration
      let images = this.props.images
      let headlines = this.props.headlines.map( headline => {return headline.value})
      let campaign = {campaignConfig, images, headlines}
      
      //Check validity
      let campaignErrs = campaignValidator(campaign)
      console.log('asd', campaignErrs)
      let isCampaignValid = campaignErrs.length === 0 

      if (isCampaignValid){
        console.log('GMMMMMM')
        let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', campaign)
      } else {
        console.log('ISSSS', campaignErrs)
        
      }
    } catch(e){}
  }


  render(){
    return (
      <div className='form-container'>
        <form id='campaign-configuration'>
          <div>Media Buyer:</div>
          {campaignConfiguration.map(config => {
            return(
              <input 
              key={config}
              type='text' 
              name={config}
              value={this.state[config]} 
              placeholder={config}
              onChange={this.handleChange}/>
            )
          })}
        </form>

        <form id='campaign-type'>
        {campaignType.map(type => {
          return (
            <div key={type} className='ui checkbox'>
              <input 
              type='checkbox'
              name={type}
              onChange={this.handleCheckBox}
              checked={this.state[type]}
              />
              <label>{type}</label>
            </div>
            )
          })
        }
        </form> 

        <form id='ob-tag'>
          <input 
            type='text' 
            name='ob_tag'
            value={this.state.ob_tag} 
            placeholder='ob_tag'
            onChange={this.handleChange}
          />

          <div className='ui checkbox'>
            <input
              type='checkbox'
              name='ob_tag_enabled'
              onChange={this.handleCheckBox}
              checked={this.state['ob_tag_enabled']}
            />
            <label>ob tag</label>
          </div>
        </form> 


        <CampaignBtns 
          handleSubmitCampaign={this.handleSubmitCampaign}
          handleSave={this.handleSave} 
          handleClear={this.handleClear} 
          to={'/creatives'} 
          pageName={'Creatives'} 
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
    campaignConfiguration: state.campaignConfiguration.campaignConfig
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCampaignConfig: (campaignConfig) => dispatch(saveCampaignSettings(campaignConfig)),
    clearCampaignConfig: () => dispatch(clearCampaignSettings()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign)