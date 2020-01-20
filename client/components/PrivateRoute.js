import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route {...rest}
    render={(props) => {
      return authed === true ? <Component {...props} /> : <Redirect to={{pathname: '/', state: {from: props.location}}} />}}
    />
  )
}

export default PrivateRoute


