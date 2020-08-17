import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

export function makeStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  )
}