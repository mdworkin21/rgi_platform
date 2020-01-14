import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {createCampaignName} from '../../server/api/campaignManagement/utilities/campaignCreation'

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
      ob_tag_enabled: false,
      ob_tag: '',
      cpc_taboola_desktop: '',
      cpc_taboola_mobile: '',
      cpc_outbrain_desktop: '',
      cpc_outbrain_mobile: '',
      daily_cap_taboola: '',
      daily_cap_outbrain: '',
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

  createCampaignArray = (data) => {
    const arr = []

    // loop through keys to find campaign types
    for(let key in data){
      // only continue if key is a campaign type and is true 
      if(key.indexOf('type_') !== 0 || data[key]) continue
      let type = key.split('_')
      console.log(type)
      let obj = {
        is_admin: this.props.admin,
        campaign_name: data.campaign_name,
        url: data.url,
        site: data.url.replace(/.*\:\/\/|\..*/g,''),
        platform: type[1],
        device: type[2],
        targeting: type[3] ? type[3] : "",
        cpc: data[`cpc_${type[1]}_${type[2]}`],
        daily_cap: data[`daily_cap_${type[1]}`]
      }

      obj.name = createCampaignName(obj)

      // if outbrain and ob_tag enabled, add tag to object
      if(obj.platform === 'outbrain'){
        obj.ob_tag = data.ob_tag_enabled ? data.ob_tag_enabled : false
      }

      arr.push(obj);
    }

    console.log(arr);

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  //This will be async
  handleSubmit = async (event) => {
    event.preventDefault()
    console.log('CLICK!')
    try {
      let campaignData = await axios.post('/api/campaignManagement/taboola/createCampaign', this.state)
    } catch(e){}
  }

  handleCheckBox = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name]
    })
  }
  render(){
    return (
      <div>
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
        <button type='submit'>SUBMIT</button>
        </form>  
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