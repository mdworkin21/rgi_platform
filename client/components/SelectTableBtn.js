import React from 'react'

const tableRenderButtons = [
  {table: 'taboolaBids', label: 'Taboola'},
  {table: 'outbrainBids', label: 'Outbrain'},
  {table: 'yahooBids', label: 'Yahoo'},
  {table: 'revContentBids', label: 'RevContent'},
]


const SelectTableBtn = (props) => {
  return (
    <div>
      {tableRenderButtons.map(el => {
        return (<button key={el.table} name={el.table} onClick={props.handleBidSelect}>{el.label}</button>)
      })}
    </div>
  )
}

export default SelectTableBtn

