import expect from 'expect.js'
import _ from 'lodash'

import createStore from '../store'
import actions from '../actions'

describe('store', () => {
  it('exists', () => {
    const store = createStore()
    expect(store.getState).to.be.a('function')
  })

  it('has state', () => {
    const store = createStore()
    expect(store.getState()).to.be.an('object')
  })

  it('can be created with default state', () => {
    const store = createStore({ foo: 1 })
    expect(store.getState().foo).to.be(1)
  })
})
