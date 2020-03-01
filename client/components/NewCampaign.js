import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import '../public/styles/newCampaign.css'
import {saveCampaignSettings, clearCampaignSettings} from '../redux/actions/campaigns/campaignConfiguration'
import CampaignBtns from './CampaignBtns'
import {campaignValidator} from  '../utilities/formValidator'

// const campaignType = [
//   'type_taboola_desktop',
//   'type_taboola_mobile',
//   'type_taboola_tablet',
//   'type_taboola_desktop_safe',
//   'type_taboola_mobile_safe',
//   'type_taboola_tablet_safe',
//   'type_outbrain_desktop',
//   'type_outbrain_mobile',
//   'type_outbrain_tablet',
//   'type_outbrain_desktop_msn',
//   'type_outbrain_desktop_premium',
//   'type_outbrain_mobile_premium',
//   'type_outbrain_tablet_premium',
//   'content',
//   'search'
// ]

// const campaignConfiguration = [
//   'campaign_name',
//   'url',
//   'cpc_taboola_desktop',
//   'cpc_taboola_mobile',
//   'daily_cap_taboola',
//   'cpc_outbrain_desktop',
//   'cpc_outbrain_mobile',
//   'daily_cap_outbrain',
//   'branding_text',
//   'country',
//   'taboola_account'
// ]

// class NewCampaign extends Component {
//   state = {
//     campaign_name: '',
//     url: '',
//     ob_tag: '',
//     cpc_taboola_desktop: '',
//     cpc_taboola_mobile: '',
//     cpc_outbrain_desktop: '',
//     cpc_outbrain_mobile: '',
//     daily_cap_taboola: '',
//     daily_cap_outbrain: '',
//     ob_tag_enabled: false,
//     type_taboola_desktop: false,
//     type_taboola_mobile: false,
//     type_taboola_desktop_safe: false,
//     type_taboola_mobile_safe: false,
//     type_outbrain_desktop: false,
//     type_outbrain_mobile: false, 
//     type_outbrain_desktop_msn: false,
//     type_outbrain_desktop_premium: false,
//     type_outbrain_mobile_premium: false
//   }

//   componentDidMount = () => {
//     const campaignConfig = this.props.campaignConfig
//     this.setState(campaignConfig)
//   }

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   handleSave = () => {
//     console.log("SAVE")
//       this.props.saveCampaignConfig(this.state)
//       // await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', this.state)
//   }

//   handleClear = async () => {
//     await this.props.clearCampaignConfig()
//     const campaignConfig = this.props.campaignConfig
//     this.setState(campaignConfig)
//   }

//   handleCheckBox = (event) => {
//     this.setState({
//       [event.target.name]: !this.state[event.target.name]
//     })
//   }

//   handleSubmitCampaign = async (event) => {
//     try {
//       event.preventDefault()
//       //Compile campaign object
//       let campaignConfig= this.props.campaignConfiguration
//       let images = this.props.images
//       let headlines = this.props.headlines.map( headline => {return headline.value})
//       let campaign = {campaignConfig, images, headlines}
      
//       //Check validity
//       let campaignErrs = campaignValidator(campaign)
//       let isCampaignValid = campaignErrs.length === 0 

//       if (isCampaignValid){
//         let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', campaign)
//         console.log('SENT', campaignData)
//       } else {
//         console.log('ERRR', campaignErrs)
        
//       }
//     } catch(e){}
//   }


//   render(){
//     return (
//       <div className='form-container'>
//         <form id='campaign-configuration'>
//           <div>Media Buyer:</div>
//           {campaignConfiguration.map(config => {
//             return(
//               <input 
//               key={config}
//               type='text' 
//               name={config}
//               value={this.state[config]} 
//               placeholder={config}
//               onChange={this.handleChange}/>
//             )
//           })}
//         </form>

//         <form id='campaign-type'>
//         {campaignType.map(type => {
//           return (
//             <div key={type} className='ui checkbox'>
//               <input 
//               type='checkbox'
//               name={type}
//               onChange={this.handleCheckBox}
//               checked={this.state[type]}
//               />
//               <label>{type}</label>
//             </div>
// //             )
// //           })
// //         }
//         </form> 

//         <form id='ob-tag'>
//           <input 
//             type='text' 
//             name='ob_tag'
//             value={this.state.ob_tag} 
//             placeholder='ob_tag'
//             onChange={this.handleChange}
//           />

//           <div className='ui checkbox'>
//             <input
//               type='checkbox'
//               name='ob_tag_enabled'
//               onChange={this.handleCheckBox}
//               checked={this.state['ob_tag_enabled']}
//             />
//             <label>ob tag</label>
//           </div>
//         </form> 


//         <CampaignBtns 
//           handleSubmitCampaign={this.handleSubmitCampaign}
//           handleSave={this.handleSave} 
//           handleClear={this.handleClear} 
//           to={'/creatives'} 
//           pageName={'Creatives'} 
//           styleClass={'button-container'}
//         />
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     admin: state.user.user.isAdmin,
//     headlines: state.campaignConfiguration.headlines,
//     images: state.campaignConfiguration.images,
//     campaignConfiguration: state.campaignConfiguration.campaignConfig
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveCampaignConfig: (campaignConfig) => dispatch(saveCampaignSettings(campaignConfig)),
//     clearCampaignConfig: () => dispatch(clearCampaignSettings()),

//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign)

const campaignType = [
  'type_taboola_desktop',
  'type_taboola_mobile',
  'type_taboola_tablet',
  'type_taboola_desktop_safe',
  'type_taboola_mobile_safe',
  'type_taboola_tablet_safe',
  'type_outbrain_desktop',
  'type_outbrain_mobile',
  'type_outbrain_tablet',
  'type_outbrain_desktop_msn',
  'type_outbrain_desktop_premium',
  'type_outbrain_mobile_premium',
  'type_outbrain_tablet_premium',
  'content',
  'search'
]

const generalConfiguration = [
  { HTMLtype: 'input', label: 'Media Buyer: ', value: 'media_buyer', id: 'media-buyer', classes:'config-inputs'},
  { HTMLtype: 'input', label: 'URL: ', value: 'url', id: 'url', classes:'config-inputs'}, 
  { HTMLtype: 'input', label: 'Campaign Name: ', value: 'campaign_name', id: 'campaign-name', classes:'config-inputs'}, 
  { HTMLtype: 'input', label: 'Branding Text: ', value: 'branding_text', id: 'branding-text', classes:'config-inputs'}, 
  { HTMLtype: 'radio', label: 'Search: ', value: 'search', id: 'search', classes:'radios'}, 
  { HTMLtype: 'radio', label: 'Content: ', value: 'content', id: 'content', classes:'radios'}, 
  { HTMLtype: 'dropdown', label: 'Country ', value: 'country', id: 'country', classes:'custom-dropdown'}, 
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


class NewCampaign extends Component {
  state = {
    campaign_name: '',
    url: '',
    branding_text: '',
    media_buyer: '',
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
    selectedOption: '',
    content: false,
    search: false,
    country: 'Select Country'
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

  handleSelectCountry = (event) => {
    console.log('event', event)
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
        console.log('ERRR', campaignErrs)
        
      }
    } catch(e){}
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















        {/* <CampaignBtns 
          handleSubmitCampaign={this.handleSubmitCampaign}
          handleSave={this.handleSave} 
          handleClear={this.handleClear} 
          to={'/creatives'} 
          pageName={'Creatives'} 
          styleClass={'button-container'}
        /> */}
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