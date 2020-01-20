import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import '../public/styles/creativeAssets.css'

class CreativeAssests extends Component {
  state = {
    headline: '',
    image: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log("CLICK")
      // let data = createCampaignArray(this.state)
      // let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', data)
    } catch(e){}
  }

  render(){
    return(
      <div id='creative-assets-container'>
        <NavLink to='create-campaigns'>CLICK TO MOVE BACK</NavLink>
        <form>
          <input 
            type='text' 
            name='headline'
            value={this.state.headline} 
            placeholder= 'Headline'
            onChange={this.handleChange}/>

          <input 
            type='text' 
            name='image'
            value={this.state.image} 
            placeholder='Image Url'
            onChange={this.handleChange}/>
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

export default CreativeAssests