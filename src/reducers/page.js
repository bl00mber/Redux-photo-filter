import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FILTERED,
  GET_PHOTOS_EMPTY,
  GET_PHOTOS_FAIL
} from '../constants/Page'

const initialState = {
  year: 0,
  photos: [],
  fetching: false,
  empty: false,
  user: '',
  moreAvialable: false,
  photosCount: '',
  error: ''
}

export default function page(state = initialState, action) {

  switch (action.type) {
    case GET_PHOTOS_REQUEST:
      return { ...state, year: 0, fetching: true, empty: false, error: '' }

    case GET_PHOTOS_SUCCESS:
      return { ...state, year: 0, photos: action.payload, fetching: false, empty: false, user: action.user, moreAvialable: action.moreAvialable, photosCount: '', error: '' }

    case GET_PHOTOS_FILTERED:
      return { ...state, year: action.year, photos: action.payload, fetching: false, empty: action.empty, moreAvialable: action.moreAvialable, photosCount: action.photosCount, error: '' }

    case GET_PHOTOS_EMPTY:
      return { ...state, photos: action.payload, fetching: false, empty: true, user: '', moreAvialable: false, error: '' }

    case GET_PHOTOS_FAIL:
      return { ...state, fetching: false, empty: false, moreAvialable: false, error: action.payload.message }

    default:
      return state;
  }

}
