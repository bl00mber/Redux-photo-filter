import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

let middleware = [thunk];

// Log state in development mode
if (process.env.NODE_ENV !== 'production') {
  let createLogger = require('redux-logger')
  const logger = createLogger()
  middleware = [...middleware, logger];
}

const applyMiddlewareConfigurated = applyMiddleware(...middleware);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddlewareConfigurated)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
