import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux';
import Authenticate from './Authenticate'
import Menu from './Menu'
import Dashboard from './Dashboard'
import ManageUsers from './ManageUsers'
import AddUser from './AddUser';
import Profile from './Profile'
import PrivateRoute from './PrivateRoute'
import CreateCampaigns from './CreateCampaigns';
import CreativeAssets from './CreativeAssets'
import {getUserFromPassport} from '../redux/thunks/users'
import '../public/styles/app.css'


class App extends Component {
  componentDidMount = async () => {
   await this.props.setUser() 
  }
  
  render(){
    return (
      <Router>
        <div id='router-container'>
          <Menu />
          <Route exact path='/' component={Authenticate} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} authed={this.props.auth} />
          <PrivateRoute exact path='/manageusers' component={ManageUsers} authed={this.props.auth} />
          <PrivateRoute exact path='/adduser' component={AddUser} authed={this.props.auth}/>
          <PrivateRoute exact path='/profile' component={Profile} authed={this.props.auth}/>
          <PrivateRoute exact path='/create-campaigns' component={CreateCampaigns} authed={this.props.auth}/>
          <PrivateRoute exact path='/creatives' component={CreativeAssets} authed={this.props.auth}/>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: () => dispatch(getUserFromPassport())
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.loggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
