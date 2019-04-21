import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route {...rest}
    render={(props) => {
      console.log('DID I DO THAT')
      return authed === true ? <Component {...props} /> : <Redirect to={{pathname: '/', state: {from: props.location}}} />}}
    />
  )
}

export default PrivateRoute