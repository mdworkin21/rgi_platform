import React from 'react'
import '../public/styles/bids.css'


//Table Specifically for Outbrain since it has different layout
const OutbrainBidTable = (props) => {
  return (
    <div id="bid-table">

      <table className="ui celled table">
          <thead>
            <tr>
              <th colSpan="6" className='center aligned' id='bid-table-header'>Outbrain</th>
            </tr>
            <tr>
              <th colSpan="1" onClick={props.sortColumn} name='section_name' className='center aligned' id='bid-table-header'>Section Name</th>
              <th colSpan="1" onClick={props.sortColumn}  name='section_id' className='center aligned' id='bid-table-header'>Section ID</th>
              <th colSpan="1" onClick={props.sortColumn}  name='country' className='center aligned' id='bid-table-header'>Country</th>
              <th colSpan="1" onClick={props.sortColumn}  name='blocks' className='center aligned' id='bid-table-header'>Blocks</th>
              <th colSpan="1" onClick={props.sortColumn}  name='modifier' className='center aligned' id='bid-table-header'>Modifier</th>
            </tr>
          </thead>
          <tbody id="table-body">
          {props.bids.map((bid, i) => {
            // console.log("HMMMM", props.bids[i].country)
              return (
                  <tr key={`${bid.publisher_id}_${bid.country}_${i}`} className='individual-bid'>
                    <td data-label='Bid' className='bid-name left aligned'>{bid.section_name}</td>
                    <td data-label='Bid' className='bid-name left aligned'>{bid.section_id}</td>
                    <td data-label='Modifier' className='bid-checkbox right aligned'>
                      <select type="ui dropdown"
                      value={props.bids[i].country} 
                      onChange={props.handleSelectCountry(i, props.platform)} 
                      name={bid.country}
                      className={`ui selection simple dropdown bid-checkbox `} 
                      >
                      {props.countries.map((nation) => {
                        return (
                          <option 
                            name={nation.country} 
                            value={nation.country} 
                            key={nation.country} 
                          >{nation.country}</option>
                        )
                      })} 
                      </select>
                    <label></label>
                  </td>
                  <td>{bid.blocks}</td>
                  <td>
                    <input 
                      className='ui input'
                      value={bid.modifier}
                      name={bid.modifier}
                      onChange={props.handleUpdateModifier(i, props.platform)} 
                      type='text' 
                    />
                  </td>
                </tr>
              )
            })
          }
          </tbody>
      </table>
    </div>
  )
}

export default OutbrainBidTable