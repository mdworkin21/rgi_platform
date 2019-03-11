import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import store from '../redux/store'
import Authenticate from './Authenticate'
import Menu from './Menu'
import Dashboard from './Dashboard'
import ManageUsers from './ManageUsers'

const App = () => {
  return (
  <Provider store={store}>
    <Router>
      <div>
        <Menu />
        <Route exact path='/' component={Authenticate} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/manageusers' component={ManageUsers} />
      </div>
    </Router>
  </Provider>
  )
}

export default App