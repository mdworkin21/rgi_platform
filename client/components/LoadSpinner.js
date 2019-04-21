import React from 'react'
import '../public/style/loadSpinner.css'

const LoadSpinner = () => {
  return (
      <div className="ui segment" id="load-spinner">
        <div className="ui active dimmer">
          <div className="ui text loader">Creating Campaign</div>
        </div>
      </div>
  )
}

export default LoadSpinner