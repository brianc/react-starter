//this is basically the exact code from redux-thunk
export default store => next => action => {
  if (typeof action != 'function') {
    //console.log(action.type, action.payload)
    return next(action)
  }
  return action(store.dispatch, store.getState)
}
