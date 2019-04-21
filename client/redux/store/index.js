import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import userReducer from '../reducers/users'
import adminReducer from '../reducers/admin'
import TaboolaCampaignReducer from '../reducers/campaigns/taboolaCampaigns'


// //Redux Devtools 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// //Combines Reducers
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  taboolaCampaigns: TaboolaCampaignReducer
})

//Creates Store
const store = createStore( rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, createLogger())))

export default store