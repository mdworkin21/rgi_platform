import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../public/styles/errmodal.css'


class ErrModal extends Component {
  handleClick = () => {
    console.log('CLICK')
  }
  render(){
    return (
      <React.Fragment>
      <div className="modal-container"></div>
        <div className="modal-content-container"> 
        <div className="modal-content">
          <h2>Sorry, there's been an error</h2>
          <p>List Errs here</p>
        </div>
        <button onClick={this.handleClick} className="ui negative button close-modal-btn"> Close</button>
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state.user.logInErr)
  return {
    err: state.user.logInErr
  }
}

export default connect(mapStateToProps)(ErrModal)