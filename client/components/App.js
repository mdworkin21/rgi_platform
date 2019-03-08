import React from 'react'
import {Provider} from 'react-redux'
import store from '../redux/store'

//When you add redux, you'll need to add 
const App = () => {
return (
  <Provider store={store}>
  <div>TESTING TESTING</div>
  </Provider>
  )
}

export default App