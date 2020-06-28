import React from 'react'
import '../public/styles/bidSearch.css'

const platformSpecific = (props) => {
  if (props.bidTableToRender === 'outbrainBids'){
    return (
      <React.Fragment>
        <div className='ui radio checkbox'>
          <input type='radio' name='searchBy' value='section_name' onChange={props.handleRadioSelect} defaultChecked/>   
          <label>Section Name</label> 
        </div>
        <div className='ui radio checkbox'>
          <input type='radio' name='searchBy' value='section_id' onChange={props.handleRadioSelect}/>   
          <label>Section ID</label> 
        </div>
      </React.Fragment>
    )
  } else {
      return (
        <div className='ui radio checkbox'>          
          <input type='radio' name='searchBy' value='publisher_id' onChange={props.handleRadioSelect} defaultChecked/>   
          <label>PubID</label>
        </div>
      )
  }
}

const BidSearch = (props) => {
    return (
      <form className='bid-search'>
        <input className='ui input'value={props.searchTerm} name='searchTerm' onChange={props.handleSearch} type='text'/>
        <label>Search</label> 
        <div className='bid-search-radio-cotainer'>
          {platformSpecific(props)}
          <div className='ui radio checkbox'>
            <input type='radio' name='searchBy' value='country' onChange={props.handleRadioSelect}/>
            <label>Country</label> 
          </div>
          <div className='ui radio checkbox'>
            <input type='radio' name='searchBy' value='blocks' onChange={props.handleRadioSelect} />
            <label>Blocks</label>   
          </div>
          <div className='ui radio checkbox'>
            <input type='radio' name='searchBy' value='modifier' onChange={props.handleRadioSelect} />
            <label>Modifier</label>
          </div>     
        </div>
      </form>
    )
}

export default BidSearch