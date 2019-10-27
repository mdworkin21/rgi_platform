import React, {Component} from 'react'
import axios from 'axios'

const campaignType = [
'taboolaDesktop',
'taboolaMobile',
'taboolaBlacklistDesktop',
'taboolaBlacklistMobile',
'taboolaMsnDesktop',
'taboolaMsnMobile',
'taboolaEspnDesktop',
'taboolaEspnMobile',
'taboolaFoxDesktop',
'taboolaFoxMobile',
'outbrainDesktop',
'outbrainMobile',
'outbrainMsnDesktop',
'outbrainPremiumDesktop',
'outbrainPremiumMobile'
]

const campaignConfiguration = [
  'campaignName',
  'url',
  'desktopCPC',
  'mobileCPC',
  'taboolaDailyCap',
  'outbrainDailyCap'
]

class NewCampaign extends Component {
  state = {
      campaignName: '',
      url: '',
      desktopCPC: '',
      mobileCPC: '',
      taboolaDailyCap: '',
      outbrainDailyCap: '',
      taboolaDesktop: false,
      taboolaMobile: false,
      taboolaBlacklistDesktop: false,
      taboolaBlacklistMobile: false,
      taboolaMsnDesktop: false,
      taboolaMsnMobile: false,
      taboolaEspnDesktop: false, 
      taboolaEspnMobile: false,
      taboolaFoxDesktop: false,
      taboolaFoxMobile: false,
      outbrainDesktop: false,
      outbrainMobile: false, 
      outbrainMsnDesktop: false,
      outbrainPremiumDesktop: false,
      outbrainPremiumMobile: false
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
        <button type='submit'>SUBBMIT</button>
        </form>  
      </div>
    )
  }
}

export default NewCampaign