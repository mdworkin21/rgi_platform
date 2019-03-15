import React from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import store from '../redux/store'
import Authenticate from './Authenticate'
import Menu from './Menu'
import Dashboard from './Dashboard'
import ManageUsers from './ManageUsers'
import AddUser from './AddUser';
import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux';


const App = (props) => {
  return (
    <Router>
      <div>
        <Menu />
        <Route exact path='/' component={Authenticate} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} authed={props.auth}/>
        <PrivateRoute exact path='/manageusers' component={ManageUsers} authed={props.auth} />
        <PrivateRoute exact path='/adduser' component={AddUser} authed={props.auth}/>
      </div>
    </Router>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.user.loggedIn
  }
}

export default connect(mapStateToProps)(App)
// export default App