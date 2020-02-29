import React from 'react'
import {NavLink} from 'react-router-dom'

const CampaignBtns = (props) => {
  const {handleSave, handleClear, to, pageName, handleSubmitCampaign, styleClass} = props
  return (
    <div className={styleClass}>
      <button type='click' onClick={handleSave} className='campaign-btn'>Save</button>
      <button type='click' className='campaign-btn' onClick={handleClear}>Clear</button>
      <button className='campaign-btn' onClick={handleSave}><NavLink to={to}>{pageName}</NavLink></button>
      <button className='campaign-btn' type='click' onClick={handleSubmitCampaign}>Create Campaign</button>
    </div>
  )
}




export default CampaignBtns