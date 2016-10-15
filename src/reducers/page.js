import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_EMPTY,
  GET_PHOTOS_FAIL
} from '../constants/Page'

const initialState = {
  year: 0,
  photos: [],
  fetching: false,
  empty: false,
  user: '',
  error: ''
}

export default function page(state = initialState, action) {

  switch (action.type) {
    case GET_PHOTOS_REQUEST:
      return { ...state, year: action.payload, fetching: true, empty: false, error: '' }

    case GET_PHOTOS_SUCCESS:
      return { ...state, photos: action.payload, fetching: false, empty: false, user: action.user, error: '' }

    case GET_PHOTOS_EMPTY:
      return { ...state, photos: action.payload, fetching: false, empty: true, user: '', error: '' }

    case GET_PHOTOS_FAIL:
      return { ...state, fetching: false, empty: false, error: action.payload.message }

    default:
      return state;
  }

}
