import React from 'react'
import ReactDOM from 'react-dom'
import './less/index.less'

import Index from './components/index'

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(function() {
    console.log('would dispose')
  })
}
const content = document.getElementById('content')
ReactDOM.render(<Index />, content)

if (process.env.NODE_ENV == 'production') {
  setTimeout(function() {
    //you can add google analytics script here
  }, 1)
}
