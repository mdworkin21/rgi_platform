import React, {Component} from 'react'
import {connect} from 'react-redux'
import CampaignBtns from './CampaignBtns'
import {saveBids, clearBids, deleteBid, updateCountryInBid} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/bids.css'
import { getAllBids, getAllCountries, addSingleCountry, addPublisher } from '../redux/thunks/campaigns/campaignConfiguration'
import AddBidData from './AddBidData'
import BidTable from './BidTable'
import OutbrainBidTable from './OutbrainBidTable'


const platformToTable = {
  taboolaBids: 'taboolabid',
  outbrainBids: 'outbrainbid',
  yahooBids: 'yahoobid',
  revContentBids: 'revcontentbid'
}

class Bids extends Component {
  state ={
    taboolaBids: [],
    outbrainBids: [],
    yahooBids: [],
    revContentBids: [],
    countries: [],
    bidsAlreadyInStore: false,
    //New Publisher
    newPubPlatform: '',
    publisherId: '',
    publisherCountry: '',
    publisherCountryAbbr: '',
    publisherBlocks: 0,
    publisherEnabled: false,
    //New Country
    newCountryName: '',
    newCountryTabCode: '',
    newCountryObCode: '',
    newCountryYahooCode: '',
    newCountryRcCode: ''
  }

  componentDidMount = async () => {
    let platforms = Object.keys(platformToTable)
  
    /*This condition is for a slight optimization, 
    rather than pinging DB just take what's in store*/
    if (this.props.bidsAlreadyInStore){
      this.setState({
        taboolaBids: this.props.taboolaBids,
        outbrainBids: this.props.outbrainBids,
        yahooBids: this.props.yahooBids,
        revContentBids: this.props.revContentBids,
        countries: this.props.countries,
        bidsAlreadyInStore: true
      })
      return
    } else {
        for (let i = 0; i< platforms.length; i++){
          await this.props.getBids(platformToTable[platforms[i]])

          this.mapBidDataToState(platforms[i])
        }
        await this.props.getCountries()
    }

    let countries = this.props.countries.map(country => {
      return {
        country: country.country,
        taboola_country_code: country.taboola_country_code,
        outbrain_country_code: country.outbrain_country_code
      }
    })

    this.setState({
      countries: countries
    })
  }

  handleChange = (event) => {  

    if (event.target.type === 'checkbox'){
      this.setState({
        [event.target.name]: !this.state[event.target.name]
      })
    } else {
        this.setState({
          [event.target.name]: event.target.value     
        })
    }
  }
  
  handleSave = () => {
    this.props.saveBids(this.state.bids)
  }  

  handleSelectCountry = (i, platform) => (event) => {
    let bids = [...this.state[platform]]
    bids[i].country = event.target.value
    bids[i].country_abbr = this.state.countries.filter(country => country.country === event.target.value)[0].taboola_country_code

    this.props.updateBidCountry(bids[i], platform.toLowerCase().slice(0, -1))

    this.setState({
      bids: this.props.bids
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const newPublisher = {
        publisher_id: this.state.publisherId,
        country: this.state.publisherCountry,
        country_abbr: this.state.publisherCountryAbbr,
        blocks: this.state.publisherBlocks,
        modifier: this.state.publisherEnabled,
    }
    const newCountry = {
      country: this.state.newCountryName,
      taboola_country_code: this.state.newCountryTabCode,
      outbrain_country_code: this.state.newCountryObCode,
      yahoo_country_code: this.state.newCountryYahooCode,
      rev_content_country_code: this.state.newCountryRcCode
    }
    
  
    if (newPublisher.publisher_id){
      await this.props.addPublisher(newPublisher)
    }

    if(newCountry.country){
      await this.props.addCountry(newCountry)
    }

    let bids = await this.props.bids
    let countries = await this.props.countries

    //NEED TO UPDATE THE NEW PUBLISHER AND BID PLATFORMS
    this.setState({
      bids: bids,
      countries: countries,
      //New Publisher
      publisherId: '',
      publisherCountry: '',
      publisherCountryAbbr: '',
      publisherBlocks: 0,
      publisherEnabled: false,
      //New Country
      newCountryName: '',
      newCountryTabCode: '',
      newCountryObCode: '',
      newCountryYahooCode: '',
      newCountryRcCode: ''
    })

  }

  mapBidDataToState = (platform) => {
    let bids

    if (platform !== 'outbrainBids'){
      bids = this.props[platform].map(bid => {
        return {
          publisher_id: bid.publisher_id,
          country: bid.country,
          country_abbr: bid.country_abbr,
          blocks: bid.blocks,
          modifier: bid.modifier
        }
      })
    } else {
        bids = this.props[platform].map(bid => {
          return {
            section_name: bid.section_name,
            section_id: bid.section_id,
            country: bid.country,
            country_abbr: bid.country_abbr,
            blocks: bid.blocks,
            modifier: bid.modifier
          }
        })
    }

    this.setState({
      [platform]: bids
    })

  }
 
  render(){
    console.log('STATE: ', this.state)
    return(
      <div id='bid-component-container'>
        <h1 id='bids-config-heading'>Bids</h1>
        <AddBidData 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          bidState={this.state} 
        />

        <div id='bid-container'>
          <BidTable 
            bids={this.state.taboolaBids} 
            handleSelectCountry={this.handleSelectCountry} 
            countries={this.state.countries}
            platform={'taboolaBids'}
          />

          <OutbrainBidTable 
            bids={this.state.outbrainBids} 
            handleSelectCountry={this.handleSelectCountry} 
            countries={this.state.countries}
            platform={'outbrainBids'}
          />

          <BidTable 
            bids={this.state.yahooBids} 
            handleSelectCountry={this.handleSelectCountry} 
            countries={this.state.countries}
            platform={'yahooBids'}
          />

          <BidTable 
            bids={this.state.revContentBids} 
            handleSelectCountry={this.handleSelectCountry} 
            countries={this.state.countries}
            platform={'revContentBids'}
          />
        </div>

       
        <CampaignBtns 
          handleSubmitCampaign={this.handleSubmitCampaign}
          // handleSave={this.props.saveBids} 
          handleClear={this.handleClear} 
          link1={'/creatives'} 
          link2={'/new-campaign'}
          pageName1={'Creatives'} 
          pageName2={'Campaigns'}
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
    campaignConfiguration: state.campaignConfiguration.campaignConfig,
    taboolaBids: state.campaignConfiguration.taboolabid,
    outbrainBids: state.campaignConfiguration.outbrainbid,
    yahooBids: state.campaignConfiguration.yahoobid,
    revContentBids: state.campaignConfiguration.revcontentbid,
    countries: state.campaignConfiguration.countries,
    bidsAlreadyInStore: state.campaignConfiguration.bidsAlreadyInStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPublisher: (bid) => dispatch(addPublisher(bid)),
    getBids: (platform) => dispatch(getAllBids(platform)),
    saveBids: (bids) => dispatch(saveBids(bids)),
    clearBids: () => dispatch(clearBids()),
    deleteBid: (bid) => dispatch(deleteBid(bid)),
    addCountry: (country) => dispatch(addSingleCountry(country)),  
    updateBidCountry: (bid, platform) => dispatch(updateCountryInBid(bid, platform)),
    getCountries: () => dispatch(getAllCountries())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bids)