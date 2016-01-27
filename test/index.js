import React from 'react'
import { mount, describeWithDOM as suite } from 'enzyme'
import expect from 'expect.js'

import App from '../components'
import store from '../store'
import Modal from 'react-modal'

suite('<App />', function() {

  before(() => {
    Modal.setAppElement(window.document.createElement('div'))
  })

  it('renders', function() {
    const el = mount(<App store={ store() } />)
  })
})
