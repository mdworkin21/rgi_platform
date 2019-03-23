import React from 'react' 
import { connect } from 'react-redux'
import Signup from './Signup'
import Login from './Login'
import ErrModal from './ErrModal'
import '../public/styles/authenticate.css'
 
const Authenticate = (props) => {
    return (
      <React.Fragment>
        {props.err ? <ErrModal/> : ''}
        <div id="login-box">
        <Signup />
        <Login />
        <div className='or'>Or</div>
      </div>
      </React.Fragment>
    )
}


const mapStateToProps = (state) => {
  return {
    err: state.user.logInErr
  }
}

export default connect(mapStateToProps)(Authenticate)



