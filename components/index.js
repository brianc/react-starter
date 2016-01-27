import React from 'react'
import _ from 'lodash'
import { Provider } from 'react-redux'

import configureStore from '../store'
import actions from '../actions'

const store = configureStore()

export default class App extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}


import { connect } from 'react-redux'
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  addItem: () => dispatch(actions.addItem()),
  removeItem: () => dispatch(actions.removeItem()),
})
@connect(mapStateToProps, mapDispatchToProps)
class Layout extends React.Component {
  render() {
    console.log('render loop')
    const { props } = this
    const { items } = props
    return (
      <div className='layout'>
        <div className='toolbar'>
          <h3>I am a fixed toolbar</h3>
          <button onClick={props.addItem}>Add an item</button>
          <button onClick={props.removeItem}>Remove an item</button>
        </div>
        <div className='content'>
          {_.times(items, i => <Item key={i} id={i} />)}
        </div>
      </div>
    )
  }
}

const Item = props => (<div>I am item {props.id} !!!</div>)
