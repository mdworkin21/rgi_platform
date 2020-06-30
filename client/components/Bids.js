import React, {Component} from 'react'
import {connect} from 'react-redux'
import CampaignBtns from './CampaignBtns'
import {saveBids, clearBids, deleteBid, updateCountryInBid} from '../redux/actions/campaigns/campaignConfiguration'
import '../public/styles/bids.css'
import { getAllBids, getAllCountries, addSingleCountry, addPublisher } from '../redux/thunks/campaigns/campaignConfiguration'
import AddBidData from './AddBidData'
import BidTable from './BidTable'
import OutbrainBidTable from './OutbrainBidTable'
import SelectTableBtn from './SelectTableBtn'
import BidSearch from './BidSearch'

const platformToTable = {
  taboolaBids: 'taboolabid',
  outbrainBids: 'outbrainbid',
  yahooBids: 'yahoobid',
  revContentBids: 'revcontentbid'
}

class Bids extends Component {
  state ={
    //Bid Data
    taboolaBids: [],
    outbrainBids: [],
    yahooBids: [],
    revContentBids: [],
    countries: [],
    bidsAlreadyInStore: false,
    bidTableToRender: 'taboolaBids',
    sortOrder: true,
    //Add Data
    showBidAddForm: false,
    formToShow: '',
    //Search Functionality
    searchTerm: '',
    searchResults: [],
    searchBy: 'publisher_id',
    //New Publisher
    newPubPlatform: '',
    publisherId: '',
    publisherCountry: '',
    publisherCountryAbbr: '',
    publisherBlocks: 0,
    publisherModifier: '',
    //New Country
    newCountryName: '',
    newCountryTabCode: '',
    newCountryObCode: '',
    newCountryYahooCode: '',
    newCountryRcCode: ''
  }
  
  closeAddBidForm = () => {
    this.setState({
      showBidAddForm: false
    })
  }

  componentDidMount = async () => {
    let platforms = Object.keys(platformToTable)
  
    /*This condition is for a slight optimization, rather than pinging DB just take what's in store */
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

  handleBidSelect = (event) => {
    this.setState({
      bidTableToRender: event.target.name
    })
  }

  handleChange = (event) => {
    //Check whther checkox condition is still relevant
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
    //This.state.bids no longer on state, needs updating
    this.props.saveBids(this.state.bids)
  }  

  handleSearch = (event) => {
    this.handleChange(event)
    let searchAttribute = this.state.searchBy 
   
    let searchResults = this.state[this.state.bidTableToRender].filter(el => {
      return el[searchAttribute].toString().indexOf(event.target.value) > -1
    })

    this.setState({
      searchResults: searchResults
    })

  }

  handleRadioSelect = (event) => {
    this.setState({
      searchBy: event.target.value
    })
  }
// See if this ad updateModifier can be combined
  handleSelectCountry = (i, platform) => (event) => {
    let bids = [...this.state[platform]]
    bids[i].country = event.target.value
    bids[i].country_abbr = this.state.countries.filter(country => country.country === event.target.value)[0].taboola_country_code

    this.props.updateBidCountry(bids[i], platform.toLowerCase().slice(0, -1))

    //THIS IS OUT OF DATE NO MORE bids Obj on state -- See handleUpdateMod
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
        modifier: this.state.publisherModifier,
    }
    const newCountry = {
      country: this.state.newCountryName,
      taboola_country_code: this.state.newCountryTabCode,
      outbrain_country_code: this.state.newCountryObCode,
      yahoo_country_code: this.state.newCountryYahooCode,
      rev_content_country_code: this.state.newCountryRcCode
    }
    
  
    //Need to update for Platform...not just OB
    if (newPublisher.publisher_id){
      await this.props.addPublisher(newPublisher)
    }

    if(newCountry.country){
      await this.props.addCountry(newCountry)
    }

    //NEED TO UPDATE THE NEW PUBLISHER AND BID PLATFORMS
    // let bids = await this.props.bids
    let countries = await this.props.countries

    this.setState({
      // bids: bids,
      countries: countries,
      showBidAddForm: false,
      formToShow: '',
      //New Publisher
      publisherId: '',
      publisherCountry: '',
      publisherCountryAbbr: '',
      publisherBlocks: 0,
      publisherModifier: false,
      //New Country
      newCountryName: '',
      newCountryTabCode: '',
      newCountryObCode: '',
      newCountryYahooCode: '',
      newCountryRcCode: ''
    })

  }

  handleUpdateModifier = (i, platform) => (event) => {
    let bids = [...this.state[platform]]
    bids[i].modifier = event.target.value

    //Sets on state but does not update DB, see handleCountry as example (dispatch etc)
    this.setState({
      [bids[i].modifier]: bids
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

  renderBidTable = (platform) => {
    let name = platform.replace('Bids', '')
    let formattedName = name.replace(/^./, name[0].toUpperCase())
    let bids = this.state.searchTerm === '' ? this.state[platform] : this.state.searchResults 

    if (platform === 'outbrainBids'){
      bids = this.state.searchTerm === '' ? this.state.outbrainBids : this.state.searchResults

      return(
        <OutbrainBidTable 
          bids={bids} 
          handleSelectCountry={this.handleSelectCountry} 
          countries={this.state.countries}
          platform={'outbrainBids'}
          handleUpdateModifier={this.handleUpdateModifier}
          sortColumn={this.sortColumn}
        />
      )  
    } 
    
    return (
      <BidTable 
        bids={bids} 
        handleSelectCountry={this.handleSelectCountry} 
        countries={this.state.countries}
        platform={platform}
        name={formattedName}
        handleUpdateModifier={this.handleUpdateModifier}
        sortColumn={this.sortColumn}
      />
    )
  }

  //This can be named better
  showBidDataAddForm = (event) => {
    this.setState({
      showBidAddForm: true,
      formToShow: event.target.name
    })
  }


  sortColumn = (event) => {  
    //If this.state.sortOrder === True the DESC, False === DESC  
    let sortBy = event.target.getAttribute('name')
    let tableCopy = this.state.searchResults.length > 0 ? [...this.state.searchResults] : [...this.state[this.state.bidTableToRender]]

    //Sorts in ASC
    tableCopy.sort((a, b) => {
      let sortByA = a[sortBy]
      let sortByB = b[sortBy]

      if (sortByA < sortByB) {
        return this.state.sortOrder ? -1 : 1
      }
  
      if (sortByA > sortByB) {
        return this.state.sortOrder ? 1 : -1
      }
  
      // sortBys must be equal
      return 0;
  })

    let tableToUpdate = this.state.searchResults.length > 0 ? 'searchResults' : this.state.bidTableToRender

    this.setState({
      [tableToUpdate]: tableCopy,
      sortOrder: !this.state.sortOrder
    })

  }
 
  render(){
    return(
      <div id='bid-component-container'>
        <h1 id='bids-config-heading'>Bids</h1>
        {this.state.showBidAddForm ?  <AddBidData handleChange={this.handleChange} handleSubmit={this.handleSubmit} bidState={this.state} formType={this.state.formToShow} closeForm={this.closeAddBidForm}/> : ''}
        <button className='add-forms ui button' name='showAddBidForm' onClick={this.showBidDataAddForm}>Add Bid</button> 
        <button className='add-forms ui button' name='showAddCountryForm' onClick={this.showBidDataAddForm}>Add Country</button> 

        <BidSearch 
          handleRadioSelect={this.handleRadioSelect}
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
          bidTableToRender={this.state.bidTableToRender}
        />
        <SelectTableBtn handleBidSelect={this.handleBidSelect}/>


        <div id='bid-container'>
          {this.renderBidTable(this.state.bidTableToRender)}
        </div>

       
        <CampaignBtns 
          handleSubmitCampaign={this.handleSubmitCampaign}
          // handleSave={this.props.saveBids} //When this method is updated, uncommet?
          handleClear={this.handleClear} //Not sure this is relevant in this comp
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
    saveBids: (bids) => dispatch(saveBids(bids)), //This may need to be updated in other files
    clearBids: () => dispatch(clearBids()),
    deleteBid: (bid) => dispatch(deleteBid(bid)),
    addCountry: (country) => dispatch(addSingleCountry(country)),  
    updateBidCountry: (bid, platform) => dispatch(updateCountryInBid(bid, platform)),
    getCountries: () => dispatch(getAllCountries())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bids)


// To Do
// 1. Address comments above
// 2. Fix this warning from console: [Violation] 'click' handler took 176ms (slow response to clicks due to taboola data size, same with onChange)
// 3. Fix this warning from console: Form submission canceled because the form is not connected (occurs when closing Add forms)
// 4. More styling all aroud
// 5. Refactor to dry out code, optimize
// 6. Responsive design for other sizes
// 7. Add platform options to add Bid form, also add Outbrain alternative
// 8. Add delete Bid? (maybe an admin command)