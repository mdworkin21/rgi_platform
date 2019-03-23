import React from 'react' 
import Signup from './Signup'
import Login from './Login'
import ErrModal from './ErrModal'
import '../public/styles/authenticate.css'
 
const Authenticate = () => {
    return (
      <React.Fragment>
        <ErrModal/>
        <div id="login-box">
        <Signup />
        <Login />
        <div className='or'>Or</div>
      </div>
      </React.Fragment>
    )
}

export default Authenticate



