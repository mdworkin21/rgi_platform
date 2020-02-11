import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveHeadlines, clearHeadlines, deleteHeadline} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/creativeAssets.css'
import '../public/styles/newCampaign.css'
import CampaignBtns from './CampaignBtns'
import Image from './Image'

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
    images: [{counter: 0, value: ''}],
    headlineCounter: 0,
    imageCounter: 0
  }

  componentDidMount = () => {
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
        <h1 id='creatives-heading'>Creatives</h1>
        <div id='creative-assets-container'>
          { this.state.headlines.map((headline, i) => {
            return(
              <div className='headline-container' key={'headline' + '_' + headline.counter}>
                
                <i 
                  className="delete basic icon" 
                  id='delete-headline'
                  name={headline.counter} 
                  onClick={this.handleDeleteHeadline(headline.counter)}>
                </i>
                
                <input
                  className='headline-input' 
                  type='text' 
                  name={i}
                  value={this.state.headlines[i].value} 
                  placeholder= 'Headline'
                  onChange={this.handleText(i)}/>
              </div>
            )}
          )}
          <button onClick={this.handleAddTextbox}>Add</button>

      
          {/* Will need to update map logic when we have real data */}
          <div id="img-container">
            {testImages.map(el => {
              console.log('ELLLL', el)
              return <Image imgSrc={el} key={el}/>
            })}
          </div>

          <CampaignBtns 
            handleSave={this.handleSave} 
            handleClear={this.handleClear} 
            to={'/create-campaigns'} 
            pageName={'Campaigns'} 
            styleClass={'button-container-2'}
          />
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