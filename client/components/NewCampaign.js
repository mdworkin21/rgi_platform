import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import '../public/styles/newCampaign.css'
import {saveCampaignSettings, clearCampaignSettings} from '../redux/actions/campaigns/campaignConfiguration'
import CampaignBtns from './CampaignBtns'
import {campaignValidator} from  '../utilities/formValidator'

const generalConfiguration = [
  { HTMLtype: 'input', label: 'Media Buyer: ', value: 'media_buyer', id: 'media-buyer', classes:'config-inputs'},
  { HTMLtype: 'input', label: 'URL: ', value: 'url', id: 'url', classes:'config-inputs'}, 
  { HTMLtype: 'input', label: 'Campaign Name: ', value: 'campaign_name', id: 'campaign-name', classes:'config-inputs'}, 
  { HTMLtype: 'input', label: 'Branding Text: ', value: 'branding_text', id: 'branding-text', classes:'config-inputs'}, 
  { HTMLtype: 'radio', label: 'Search: ', value: 'search', id: 'search', classes:'radios'}, 
  { HTMLtype: 'radio', label: 'Content: ', value: 'content', id: 'content', classes:'radios'}, 
  { HTMLtype: 'dropdown', label: 'Country ', value: 'country', id: 'country', classes:'custom-dropdown'}, 
]

//Create function to create this array of objects, lots of repeated info, can be made dry
const platformConfiguration = [
    { 
      platform: 'Taboola',
      logo: 'taboola_logo.png',
      platform_specific_config: {
        'taboola_accounts': {
          label: 'Taboola Account',
          options: ['value1', 'value2']
        },
        daily_cap: {
          label: 'Taboola Daily Cap',
          cap: '30'
        }
      },
      devices: [
        {
          device: 'Desktop',
          fields: [
            {value: 'cpc_taboola_desktop', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_taboola_desktop_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_taboola_desktop', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Tablet',
          fields: [
            {value: 'cpc_taboola_tablet', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_taboola_tablet_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_taboola_tablet', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Mobile',
          fields: [
            {value: 'cpc_taboola_mobile', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_taboola_mobile_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_taboola_mobile', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        }
      ]},
    {
      platform: 'Outbrain',
      logo: 'Outbrain-Logo.png',
      platform_specific_config: '',
      devices:[
        {
          device: 'Desktop',
          fields: [
            {value: 'cpc_outbrain_desktop', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_outbrain_desktop_msn', label: 'msn', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_outbrain_desktop_premium', label: 'premium', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_outbrain_desktop', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Tablet',
          fields: [
            {value: 'cpc_outbrain_tablet', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_outbrain_tablet_premium', label: 'premium', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_outbrain_tablet', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Mobile',
          fields: [
            {value: 'cpc_outbrain_mobile', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_outbrain_mobile_premium', label: 'premium', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_outbrain_mobile', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        }
      ]},
    {
      platform: 'Yahoo',
      logo: 'yahoo_logo.png',
      platform_specific_config: '',
      devices:[
        {
          device: 'Desktop',
          fields: [
            {value: 'cpc_yahoo_desktop', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_yahoo_desktop_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_yahoo_desktop', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Tablet',
          fields: [
            {value: 'cpc_yahoo_tablet', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_yahoo_tablet_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_yahoo_tablet', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Mobile',
          fields: [
            {value: 'cpc_yahoo_mobile', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_yahoo_mobile_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_yahoo_mobile', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        }
      ]},
    {
      platform: 'Rev-Content',
      logo: 'revContetnt_logo.png',
      platform_specific_config: '',
      devices:[
        {
          device: 'Desktop',
          fields: [
            {value: 'cpc_revContent_desktop', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_revContent_desktop_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_revContent_desktop', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Tablet',
          fields: [
            {value: 'cpc_revContent_tablet', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_revContent_tablet_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_revContent_tablet', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        },
        {
          device: 'Mobile',
          fields: [
            {value: 'cpc_revContent_mobile', label: 'CPC', HTMLtype: 'text', classes: 'campaign-cpc'},
            {value: 'type_revContent_mobile_safe', label: 'safe', HTMLtype: 'checkbox', classes: 'campaign-type'},
            {value: 'type_revContent_mobile', label: 'regular', HTMLtype: 'checkbox', classes: 'campaign-type'}
          ],
        }
      ]} 
  ]

const countries = [
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

//Need to make sure reducer is up to date with this state (see last few properties)
class NewCampaign extends Component {
  state = {
    // General
    campaign_name: '',
    url: '',
    branding_text: '',
    media_buyer: '',
    content: false,
    search: false,
    country: 'Select Country',
    selectedOption: '',
    // Taboola
    cpc_taboola_desktop: '',
    cpc_taboola_tablet: '',
    cpc_taboola_mobile: '',
    type_taboola_desktop: false,
    type_taboola_tablet: false,
    type_taboola_mobile: false,
    type_taboola_desktop_safe: false,
    type_taboola_tablet_safe: false,
    type_taboola_mobile_safe: false,
    taboola_account: '',
    daily_cap_taboola: '',
    //Outbrain
    daily_cap_outbrain: '',
    cpc_outbrain_desktop: '',
    cpc_outbrain_tablet: '',
    cpc_outbrain_mobile: '',
    ob_tag: '',
    ob_tag_enabled: false,
    type_outbrain_desktop: false,
    type_outbrain_mobile: false, 
    type_outbrain_tablet: false,
    type_outbrain_tablet_premium: false,
    type_outbrain_desktop_msn: false,
    type_outbrain_desktop_premium: false,
    type_outbrain_mobile_premium: false
  }

  componentDidMount = () => {
    const campaignConfig = this.props.campaignConfiguration
    this.setState(campaignConfig)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave = () => {
    this.props.saveCampaignConfig(this.state)
  }

  handleClear = async () => {
    await this.props.clearCampaignConfig()
    const campaignConfig = this.props.campaignConfiguration
    this.setState(campaignConfig)
  }

  handleCheckBox = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }

  handleActivatePlatformConfig = (event) => {
    this.setState({
      platformConfigure: event.currentTarget.textContent
    })
  }

  handleSelectCountry = (event) => {
    this.setState({
      country: event.currentTarget.textContent
    })
  }

  handleRadio = (event) => {
    this.setState({
      selectedOption: event.target.name,
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
      let isCampaignValid = campaignErrs.length === 0 

      if (isCampaignValid){
        let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', campaign)
        console.log('SENT', campaignData)
      } else {
        console.error('Campaign Validation Errors:', campaignErrs)
      }
    } catch(e){}
  }

  renderPlatformSpecificConfig = (platformObj) => {
    if (platformObj.platform === 'Taboola'){
      return (
      <div className='ui segment platform-obj' id='tab-platform-specific'>
        <div id='tab-daily-cap-container'>
          <label id='tab-daily-cap-label'>Daily Cap:</label>
          <input
            type='text'
            name='daily_cap_taboola'
            value={this.state.daily_cap_taboola}
            onChange={this.handleChange}
            id='tab-daily-cap'
            className='platform-input'
          />
        </div>
        <div id='tab-accounts-container'>
          <label className=''> Accounts:</label>
          <select id='tab-accout-dropdown' className={`ui selection simple dropdown `} placeholder='Need to make drop down'>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        
      </div>)
    } else if (platformObj.platform === 'Outbrain'){
        return(
          <div className='platform-obj' id='ob-platform-specific'>
            <label id='ob-tag-label'>Outbrain Tag</label>
            <form id='ob-tag'>
              <input 
                type='text' 
                name='ob_tag'
                value={this.state.ob_tag} 
                onChange={this.handleChange}
                id='ob-tag-textbox'
              />
              <div className='ui checkbox'>
                <input
                  type='checkbox'
                  name='ob_tag_enabled'
                  onChange={this.handleCheckBox}
                  checked={this.state['ob_tag_enabled']}
                  id='ob-tag-checkbox'
                />
                <label>ob tag</label>
              </div>
            </form> 
          </div>
        )

    }
  }
 
  renderPlatformConfigure = () => {
      return (
        <div id='platform-config-device'>
          {platformConfiguration.map(platform => {
            return (
              <div key={platform.platform} className='platform-obj-container'>
                <div className='logo-container' >
                  <img src={platform.logo}  className='platform-logos' id={platform.platform}/>
                </div>
                {platform.devices.map(config => {
                  return(
                    <div key={config.device} className='ui segment platform-obj'>
                      <label className='platform-obj-device-elements'>{config.device}</label>
                      <div className='platform-input-container'>
                        {config.fields.map(field => {
                          if (field.HTMLtype === 'text'){
                            return (
                              <div key={field.value} className={`${field.classes} platform-obj-device-elements`} id='platform-input-container'>
                                <label className='cpc-label'> {field.label}</label>
                                <input 
                                type='text' 
                                name={field.value}
                                value={this.state[field.value]} 
                                onChange={this.handleChange}
                                className='platform-input'
                                />
                              </div>
                            )
                          } else if (field.HTMLtype === 'checkbox'){
                              return (
                                <div key={field.value} className={`ui checkbox ${field.classes}`} id={`type-${field.label}`}>
                                  <input 
                                  type="checkbox" 
                                  name={field.value}
                                  onChange={this.handleCheckBox} 
                                  checked={this.state[field.value]}
                                  />
                                  <label>{field.label}</label>
                                </div>
                              )
                            } 
                          })}

                      </div>
                    </div>
                  )
                })}
                 {this.renderPlatformSpecificConfig(platform)}
              </div>
              ) 
            })
          }
          
          </div>
      )
    
  }


  render(){
    console.log('STATE ', this.state)
    return (
      <div className='form-container'>
        <form id='campaign-configuration' className='ui form'>
          {generalConfiguration.map(config => {

            if(config.HTMLtype === 'input'){
              return(
                <div key={config.value} id={config.id} className={config.classes}>
                  <label id='gen-form-labels'> {config.label}</label>
                  <input 
                  type='text' 
                  name={config.value}
                  value={this.state[config.value]} 
                  onChange={this.handleChange}/>
                </div>
              )
            } else if (config.HTMLtype === 'radio'){
                return (
                  <div key={config.value} className={`ui radio ${config.classes}`} id={config.id}>
                    <label id='gen-form-labels'> {config.label}</label>
                    <input 
                      type='radio'
                      name={config.value}
                      value={config.value}
                      onChange={this.handleCheckBox}
                      checked={this.state.selectedOption === config.value}
                      onClick={this.handleRadio}
                    />
                  </div>
                )
            } else if (config.HTMLtype === 'dropdown'){
                return (
                  <div key={config.value} className={`ui selection simple dropdown `} id={config.id}>
                    <input type="hidden" name="country"/>
                      <i className="dropdown icon "></i>
                      <div className="default text">{this.state.country}</div>
                      <div className="menu" id='selection-container'>
                        {countries.map(country => {
                            return (
                            <div 
                              key={country.value} 
                              className="item"  
                              data-value={`${country.class}`} 
                              onClick={this.handleSelectCountry} 
                              name={country.value} 
                              value={this.state.country}>
                                <i className={`${country.class} flag`}></i>{country.value}
                          </div>
                            )
                        })}
                      </div>
                    </div>
                )
            }
          })}
        </form>


        <div id='platform-setting-container'>
            {this.renderPlatformConfigure()}
        </div>

        <CampaignBtns 
          handleSubmitCampaign={this.handleSubmitCampaign}
          handleSave={this.handleSave} 
          handleClear={this.handleClear} 
          link1={'/creatives'} 
          link2={'/bids'}
          pageName1={'Creatives'} 
          pageName2={'Bids'}
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