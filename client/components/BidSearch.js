import React from 'react'

const BidSearch = (props) => {
  if (props.bidTableToRender === 'outbrainBids'){
    return (
      <form>
        <input className='ui input'value={props.searchTerm} name='searchTerm' onChange={props.handleSearch} type='text'/>
        <label>Search</label> 
        <input type='radio' name='searchBy' value='section_name' onClick={props.handleRadioSelect}/>   
        <label>Section Name</label> 
        <input type='radio' name='searchBy' value='section_id' onClick={props.handleRadioSelect}/>   
        <label>Section ID</label> 
        <input type='radio' name='searchBy' value='country' onClick={props.handleRadioSelect}/>
        <label>Country</label> 
        <input type='radio' name='searchBy' value='blocks' onClick={props.handleRadioSelect} />
        <label>Blocks</label>    
        <input type='radio' name='searchBy' value='modifier' onClick={props.handleRadioSelect} />
        <label>Modifier</label>     
       </form>
    )
  } else {
      return (
        <form>
          <input className='ui input'value={props.searchTerm} name='searchTerm' onChange={props.handleSearch} type='text'/>
          <label>Search</label> 
          <input type='radio' name='searchBy' value='publisher_id' onClick={props.handleRadioSelect}/>   
          <label>PubID</label> 
          <input type='radio' name='searchBy' value='country' onClick={props.handleRadioSelect}/>
          <label>Country</label> 
          <input type='radio' name='searchBy' value='blocks' onClick={props.handleRadioSelect} />
          <label>Blocks</label>    
          <input type='radio' name='searchBy' value='modifier' onClick={props.handleRadioSelect} />
          <label>Modifier</label>     
        </form>
      )
  }

}

export default BidSearch