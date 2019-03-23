import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../public/styles/errmodal.css'
import { closeModal } from '../redux/actions/users';


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
          <h2>Sorry, there's been an error</h2>
          <p>{this.props.errors}</p>
        </div>
        <button onClick={this.handleClick} className="ui negative button close-modal-btn"> Close</button>
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