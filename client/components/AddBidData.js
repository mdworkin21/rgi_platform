import React from 'react'
import '../public/styles/addBidData.css'

// This can probably be dried out
const AddBidData = (props) => {
  const {bidState} = props

  return (
    <div id='add-bid-data-form-container'>
      <form onSubmit={props.handleSubmit} className='ui form add-bid-data-form' id='add-data-form-configuration'>
        <h4>Add Publisher</h4>
        <input onChange={props.handleChange} type='text' name='publisherId' value={bidState.publisherId} placeholder='Publisher ID'/>
        <input onChange={props.handleChange} type='text' name='publisherCountry' value={bidState.publisherCountry}  placeholder='Country'/>
        <input onChange={props.handleChange} type='text' name='publisherCountryAbbr' value={bidState.publisherCountryAbbr}  placeholder='Country Abbr.'/>
        <input onChange={props.handleChange} type='number' name='publisherBlocks' value={bidState.publisherBlocks}  placeholder='Blocks'/>
        <input 
          className='ui checkbox'
          onChange={props.handleChange} 
          type='checkbox' 
          name='publisherEnabled' 
          checked={bidState.publisherEnabled}
        />
        <label>Enabled</label>
        <button type='submit'>Add</button>
      </form>

      <form onSubmit={props.handleSubmit} className='ui form add-bid-data-form' id='add-country'>
        <h4>Add Country</h4>
        <input onChange={props.handleChange} type='text' name='newCountryName' placeholder='Coutry' value={props.newCountryName}/>
        <input onChange={props.handleChange} type='text' name='newCountryTabCode' placeholder='Taboola Code' value={props.newCountryTabCode}/>
        <input onChange={props.handleChange} type='text' name='newCountryObCode' placeholder='Outbrain Code' value={props.newCountryObCode}/>
        <input onChange={props.handleChange} type='text' name='newCountryYahooCode' placeholder='Yahoo Code' value={props.newCountryYahooCode}/>
        <input onChange={props.handleChange} type='text' name='newCountryRcCode' placeholder='Rev Content Code' value={props.newCountryRcCode}/>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddBidData