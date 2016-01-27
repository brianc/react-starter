import _ from 'lodash'
import Promise from 'bluebird'

const typed = type => payload => ({ type, payload })

export const actions = {}
const reducers = {}

export const add = (type, reducer, actionCreator = typed(type)) => {
  reducers[type] = reducer
  actions[type] = actionCreator
}

const missingReducer = (state, action) => state

const initial = {
  items: 3,
}

export default (state = initial, action) => {
  return (reducers[action.type] || missingReducer)(state, action)
}

add('addItem', (state, payload) => {
  return {
    ...state,
    items: state.items + 1
  }
})

add('removeItem', (state, payload) => {
  return {
    ...state,
    items: Math.max(state.items - 1, 0)
  }
})
