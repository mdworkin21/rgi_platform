import React, {Component} from 'react'
import axios from 'axios'

import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveHeadlines, clearHeadlines, deleteHeadline, saveImages, clearImages, deleteImage} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/creativeAssets.css'
import '../public/styles/newCampaign.css'
import CampaignBtns from './CampaignBtns'
import Image from './Image'
import {campaignValidator} from  '../utilities/formValidator'

let testImages = [
  "https://s.hdnux.com/photos/65/50/72/14061202/5/gallery_medium.jpg",
  "https://cdn.vox-cdn.com/thumbor/Zlvd88Wrxb18FmiqZYmdmzMoSEM=/0x0:3000x2000/1200x800/filters:focal(0x0:3000x2000)/cdn.vox-cdn.com/uploads/chorus_image/image/49546013/GettyImages-77502576.0.jpg",
  "https://www.si.com/.image/t_share/MTY4MTAyNDY4NzU1NzkzMTY5/joe-montana-tall-trophy-inlinejpg.jpg",
  "https://cdn-s3.si.com/s3fs-public/brett-favre-sportsman-of-the-year.jpg"
  ]

class CreativeAssests extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef();
  }

  state = {
    headlines: [{counter: 0, value: ''}],
    images: [],
    headlineCounter: 0,
    image: ''
  }

  componentDidMount = () => {
    let headlines = this.props.headlines 
    let images = this.props.images

    this.setState({
      headlines,
      images
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleAddImages = (event) => {
    event.preventDefault()
    let images = this.state.image.split(',')

    for (let i = 0; i < images.length; i++){
      images[i] = images[i].trim()
    }
    let updatedImages = [...this.state.images, ...images]

    this.setState({
      images: updatedImages,
      image: ''
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
    this.props.saveImages(this.state.images)
  }

  handleClear = async () => {
    await this.props.clearHeadlines()
    await this.props.clearImages()

    this.setState({
      headlines: [{counter: 0, value: ''}],
      images: []
    })
  }

  handleDeleteHeadline = (i)=> async (event) => {
    await this.props.deleteHeadline(i)
    let headlines = this.props.headlines
    this.setState({headlines: headlines})
  }

  handleDeleteImage = (i) => async (event) => {
    await this.props.deleteImage(i)
    let images = this.props.images
    this.setState({images: images})
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
        console.log('GMMMMMM')
        let campaignData = await axios.post('/api/campaignManagement/processCampaignQueue/createCampaign', campaign)
      } else {
        console.log('ISSSS', campaignErrs)
        
      }
    } catch(e){}
  }


  render(){
    return(
      <React.Fragment> 
        <h1 id='creatives-heading'>Creatives</h1>
        <div id='creative-assets-container'>
          <div className='headline-container'>
            { this.state.headlines.map((headline, i) => {
              return(
                <div className='headline' key={'headline' + '_' + headline.counter}>
                  
                  <i 
                    className="delete basic icon" 
                    id='delete-headline'
                    name={headline.counter} 
                    onClick={this.handleDeleteHeadline(headline.counter)}>
                  </i>
                  
                  <input
                    id='headline-input' 
                    type='text' 
                    name={i}
                    value={this.state.headlines[i].value} 
                    placeholder= 'Headline'
                    onChange={this.handleText(i)}/>
                </div>
              )}
            )}
          </div>
          <button onClick={this.handleAddTextbox}>Add</button>

          <form id='add-image-form' onSubmit={this.handleAddImages}>
            <input 
              id='image-input' 
              type='text' 
              name='image'
              value={this.state.image} 
              placeholder= 'Image URLs'
              onChange={this.handleChange}
            />

          <div id="img-container" className='ui grid stackable'>
            {this.state.images.map((imgUrl, i) => {
              return (
                <div key={imgUrl}>
                   <i 
                    className="delete basic icon" 
                    id='delete-image'
                    name={i} 
                    value={this.state.images[i]}
                    onClick={this.handleDeleteImage(i)}>
                  </i>
                  <Image imgSrc={imgUrl}/>
                </div>
              )
            })}
          </div>

          </form>

          <CampaignBtns 
            handleSubmitCampaign={this.handleSubmitCampaign}
            handleSave={this.handleSave} 
            handleClear={this.handleClear} 
            to={'/create-campaigns'} 
            pageName={'Campaigns'} 
            styleClass={'button-container-2'}
          />
      </div>
      </React.Fragment>
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
    saveHeadlines: (headlines) => dispatch(saveHeadlines(headlines)),
    clearHeadlines: () => dispatch(clearHeadlines()),
    deleteHeadline: (headline) => dispatch(deleteHeadline(headline)),
    saveImages: (images) => dispatch(saveImages(images)),
    clearImages: () => dispatch(clearImages()),
    deleteImage: (image) => dispatch(deleteImage(image))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreativeAssests)