import express from 'express'
import config from './lib/config'
import webpack from './lib/webpack-middleware'

const app = express()
webpack(app)

import React from 'react'
import ReactDOM from 'react-dom/server'

const tpl = inner => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <link rel='stylesheet' type='text/css' href='/style.css' />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  </head>
  <body>
    <div id='content'>${inner}</div>
    <script src='/client.js'></script>
  </body>
</html>
`
app.get('/', (req, res) => {
  delete require.cache[require.resolve('./components/index')]
  const Index = require('./components/index').default
  const output = ReactDOM.renderToStaticMarkup(<Index />)
  res.set('content-type', 'text/html')
  res.send(tpl(output)).end()
})

app.use(express.static(__dirname + '/public'))

//if webpack is not running just send blank
app.get('/style.css', (req, res) => {
  res.sendStatus(204)
})

import http from 'http'
const port = process.env.PORT || 3000
http.createServer(app).listen(port, () => console.log('listening on', port))
