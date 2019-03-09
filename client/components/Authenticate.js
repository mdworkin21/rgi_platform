import React from 'react' 
import Signup from './Signup'
import Login from './Login'
import '../public/styles/authenticate.css'

const Authenticate = () => {
    return (
      <div id="login-box">
        <Signup />
        <Login />
        <div className='or'>Or</div>
      </div>
    )
}

export default Authenticate