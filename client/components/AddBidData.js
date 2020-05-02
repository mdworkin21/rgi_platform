import React from 'react'
import '../public/styles/addBidData.css'

// Add more fields
const AddBidData = (props) => {
  return (
    <div id='add-bid-data-form'>
     <form onSubmit={props.handleSubmit}>
        <input onChange={props.handleChange} type='text' name='newPublisher' value={props.newPublisher}/>
        <label>New Publisher</label>
        <button type='submit'>Add</button>
    </form>

    <form onSubmit={props.handleSubmit}>
      <input onChange={props.handleChange} type='text' name='newCountry' value={props.newCountry}/>
      <label> New Country </label>
      <button type='submit'>Add</button>
    </form>

    </div>
  )
}

export default AddBidData