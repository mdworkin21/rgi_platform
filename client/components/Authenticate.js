import React from 'react' 
import { connect } from 'react-redux'
import Login from './Login'
import ErrModal from './ErrModal'
import '../public/styles/authenticate.css'
 
const Authenticate = (props) => {
    return (
      <React.Fragment>
        {props.err ? <ErrModal errors={props.errMessage}/> : ''}
        <div id="login-box">
          <Login />
        </div>
      </React.Fragment>
    )
}


const mapStateToProps = (state) => {
  return {
    err: state.applicationLevel.logInErr,
    errMessage: state.applicationLevel.errMsg
  }
}

export default connect(mapStateToProps)(Authenticate)



