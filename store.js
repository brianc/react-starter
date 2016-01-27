import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import asyncMiddleware from './reducers/async-middleware'

const makeStore = applyMiddleware(asyncMiddleware)(createStore)

export default (initialState) => {
  const store = makeStore(rootReducer, initialState)

  if (module.hot) {
    console.log('try to accept reducers')
    module.hot.accept('./reducers', () => {
      console.log('accepting reducers')

      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer.default)
    })
  }

  return store
}
