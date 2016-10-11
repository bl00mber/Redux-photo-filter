import {
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../constants/User'

const initialState = {
  name: 'Anonym',
  login: false,
  error: ''
}

export default function user(state = initialState, action) {

  switch(action.type) {
    case LOGOUT_SUCCESS:
      return { ...state, name: action.payload, login: action.login, error: '' }
      
    case LOGIN_SUCCESS:
      return { ...state, name: action.payload, login: action.login, error: '' }

    case LOGIN_FAIL:
      return { ...state, error: action.payload.message }

    default:
      return state
  }

}
