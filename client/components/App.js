import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import store from '../redux/store'
import Authenticate from './Authenticate'
import Menu from './Menu'

//When you add redux, you'll need to add 
const App = () => {
return (
  <Provider store={store}>
  <Router>
    <div>
      <Menu />
      <Route exact path='/' component={Authenticate} />
    </div>
  </Router>
  </Provider>
  )
}

export default App