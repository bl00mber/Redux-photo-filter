import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
require('./styles/App.styl')

render(
  <App />,
  document.getElementById('root')
)
