import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import '../public/styles/creativeAssets.css'


class CreativeAssests extends Component {
  state = {
    headlines: [''],
    images: ['']
  }

  
  handleText = (i) => (event) => {
    let headlines = [...this.state.headlines]
    headlines[i] = event.target.value
    this.setState({
      headlines
    })
  }

  handleAddTextbox = () => {
    this.setState({ headlines: [...this.state.headlines, '']});
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
      <div> 
        <div id='creative-assets-container'>
          <NavLink to='create-campaigns'>CLICK TO MOVE BACK</NavLink>
          { this.state.headlines.map((headline, i) => {
            return(
              <div key={'headline' + '_' + i}>
                <input 
                  type='text' 
                  name={i}
                  value={this.state.headlines[i]} 
                  placeholder= 'Headline'
                  onChange={this.handleText(i)}/>
              </div>
            )}
          )}
          <button onClick={this.handleAddTextbox}>Add</button>

      </div>

        }


        {/* <form><input 
            type='text' 
            name='image'
            value={this.state.image} 
            placeholder='Image Url'
            onChange={this.handleChange}/>
        </form> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.user.user.isAdmin
  }
}

export default  connect(mapStateToProps)(CreativeAssests)