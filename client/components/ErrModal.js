import React, {Component} from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions/applicationLevel';
import '../public/styles/errmodal.css'


class ErrModal extends Component {
  handleClick = () => {
    this.props.resetModal()
  }

  render(){
    return (
      <React.Fragment>
      <div className="modal-container"></div>
        <div className="modal-content-container"> 
        <div className="modal-content">
          <h2>Sorry, there's been an error.</h2>
          <h3 className="err-message">{this.props.errors}</h3>
        </div>
        <button onClick={this.handleClick} className="ui negative button close-modal-btn">Close</button>
      </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => dispatch(closeModal())
  }
}

export default connect(null, mapDispatchToProps)(ErrModal)