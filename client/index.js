import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import './styles/app.css'
import configureStore from './store/configureStore'

// Implementing material-ui

import {blue500, blue50} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Theme customization

const muiTheme = getMuiTheme({
  raisedButton: {
    color: blue500,
    textColor: blue50
  },
  textField: {
    focusColor: blue500,
    borderColor: blue50
  }
});

const store = configureStore()

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <div className='app'>
        <App />
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
