import React, {Component, useCallback} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveHeadlines, clearHeadlines, deleteHeadline} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/creativeAssets.css'
import '../public/styles/newCampaign.css'
import Dropzone from './ImageDrop'


class CreativeAssests extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();
  }

  state = {
    headlines: [''],
    images: ['']
  }

  componentDidMount = () => {
    console.log("HEAD", this.props.headlines)
    let headlines = this.props.headlines 
    this.setState({
      headlines
    })
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

  handleSave = () => {
    this.props.saveHeadlines(this.state.headlines)
    // await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', this.state)
}

  handleClear = async () => {
    await this.props.clearHeadlines()
    // const headlines = [...this.props.headlines, '']
    this.setState({headlines: ['']})
  }

  //This works, might be a betterway
  // If you delete one w/o saving, both get erased. Bug not feature
  handleDeleteHeadline = (i)=> async (event) => {
    await this.props.deleteHeadline(i)
    let headlines = this.props.headlines
    this.setState({headlines: headlines})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log("CLICK")
      // let data = createCampaignArray(this.state)
      // let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', data)
    } catch(e){}
  }

    onDrop = (file) => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
     
  }


  render(){
    return(
      <div> 
        <div id='creative-assets-container'>
          { this.state.headlines.map((headline, i) => {
            return(
              <div key={'headline' + '_' + i}>
                
                <i 
                  className="delete basic icon" 
                  name={i} 
                  onClick={this.handleDeleteHeadline(i)}>
                </i>
                
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

      
      <Dropzone onDrop={this.onDrop} accept={"image/*"} />

       {/* Put in own component use in creative component also */}
       <div className='button-container-2'>
          <button type='click' onClick={this.handleSave} className='campaign-btn'>Save Settings</button>
          <button type='click' className='campaign-btn' onClick={this.handleClear}>Clear Settings</button>
          <button className='campaign-btn'><NavLink to='/create-campaigns'>Campaign Configuration</NavLink></button>
        </div>

        

        {/* <form><input 
            type='text' 
            name='image'
            value={this.state.image} 
            placeholder='Image Url'
            onChange={this.handleChange}/>
        </form> */}
      </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  console.log("PROPSTATE", state.campaignConfiguration.headlines)
  return {
    admin: state.user.user.isAdmin,
    headlines: state.campaignConfiguration.headlines
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    saveHeadlines: (headlines) => dispatch(saveHeadlines(headlines)),
    clearHeadlines: () => dispatch(clearHeadlines()),
    deleteHeadline: (headline) => dispatch(deleteHeadline(headline))
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(CreativeAssests)