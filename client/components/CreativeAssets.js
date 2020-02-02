import React, {Component, useCallback} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveHeadlines, clearHeadlines, deleteHeadline} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/creativeAssets.css'
import '../public/styles/newCampaign.css'
import Images from './Images'
import {useDropzone} from 'react-dropzone'



class CreativeAssests extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();
  }

  state = {
    headlines: [{counter: 0, value: ''}],
    images: [''],
    headlineCounter: 0
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
    headlines[i].value = event.target.value
    this.setState({
      headlines
    })
  }

  handleAddTextbox = () => {
    let counter = this.state.headlineCounter + 1
    let newHeadline = {counter: counter, value: ''}
    let updatedHeadlines = [...this.state.headlines, newHeadline]
    
    this.props.saveHeadlines(updatedHeadlines)
    this.setState({ headlines: updatedHeadlines, headlineCounter:  counter});
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
    console.log("DROPPPPPP")
     
  }


  render(){
    return(
      <div> 
        <div id='creative-assets-container'>
          { this.state.headlines.map((headline, i) => {
            return(
              <div key={'headline' + '_' + headline.counter}>
                
                <i 
                  className="delete basic icon" 
                  id='delete-headline'
                  name={headline.counter} 
                  onClick={this.handleDeleteHeadline(headline.counter)}>
                </i>
                
                <input 
                  type='text' 
                  name={i}
                  value={this.state.headlines[i].value} 
                  placeholder= 'Headline'
                  onChange={this.handleText(i)}/>
              </div>
            )}
          )}
          <button onClick={this.handleAddTextbox}>Add</button>

      
      <Images />

       {/* Put in own component use in creative component also */}
       <div className='button-container-2'>
          <button type='click' onClick={this.handleSave} className='campaign-btn'>Save</button>
          <button type='click' className='campaign-btn' onClick={this.handleClear}>Clear</button>
          <button className='campaign-btn'><NavLink to='/create-campaigns'>Campaign</NavLink></button>
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