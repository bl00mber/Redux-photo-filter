import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FILTERED,
  GET_PHOTOS_EMPTY,
  GET_PHOTOS_FAIL
} from '../constants/Page'

let data = [],
    allData = [],
    filteredData = [],
    currentPhotos = [],
    currentNickname = ''

function changeFilteredPreview(nickname, year) {

  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST
    })

    return filter(allData, year, dispatch)
  }

}

function filter(allData, year, dispatch) {

  filteredData = []
  currentPhotos = []

  filteredData = allData.filter((elem) => {
    let UNIX_timestamp = elem.created_time
    let a = new Date(UNIX_timestamp * 1000)
    let elemYear = a.getFullYear()

    return elemYear == year
  })
  console.log('filtered array')
  console.dir(filteredData)

  filteredData.forEach((item, index) => {
    if (index < 20)
    currentPhotos.push(item)
  })

  let moreAvialableProp = true, emptyProp = false

  if (currentPhotos.length == 0) { emptyProp = true, moreAvialableProp = false }

  console.log('moreAvialableProp: ' + moreAvialableProp)

  dispatch({
    type: GET_PHOTOS_FILTERED,
    year: year,
    payload: currentPhotos,
    empty: emptyProp,
    moreAvialable: moreAvialableProp,
    photosCount: filteredData.length || true
  })

}

function loadFilteredPreview(nickname, year) {

  console.log('loadFilteredPreview')

  currentPhotos.forEach((item) => {
    allData.push(item)
  })

  return getMore(true, year)

}

// Function that loaded more photos, if argument 'all' == true this function
// will load first 600 photos by user from Instagram database for filtering

function getMore(all, year) {

  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST
    })

    function load() {
      console.log('loading')
      let lastPhotoId = data.items[data.items.length - 1].id

      var xhr = new XMLHttpRequest();
      // For CORS add https://crossorigin.me/
      xhr.open('GET','https://www.instagram.com/' + currentNickname + '/media/?max_id=' + lastPhotoId);
      xhr.onload = function() {
        if (xhr.status == 200) {
          data = JSON.parse(xhr.responseText)
          console.dir(data)

          let currentUser = data.items[0].user.full_name

          if (all) {
            // Load first 600 photos
            if (data.more_available === true && allData.length < 200) {
              data.items.forEach((item) => {
                allData.push(item)
              })
              console.dir(allData);

              load()

            } else {
              return filter(allData, year, dispatch)
            }
          } else {
            data.items.forEach((item) => {
              currentPhotos.push(item)
            })

            dispatch({
              type: GET_PHOTOS_SUCCESS,
              payload: currentPhotos,
              user: currentUser,
              moreAvialable: data.more_available
            })
          }
        }
      }
      xhr.send();
    }
    load()
  }

}


function loadPreview(nickname) {

  currentNickname = nickname

  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST
    })

    data = []
    allData = []
    currentPhotos = []

    var xhr = new XMLHttpRequest();

    // For CORS add https://crossorigin.me/
    xhr.open('GET','https://www.instagram.com/' + nickname + '/media/');
    xhr.onload = function(e) {
      if (xhr.status == 200) {
        var response = xhr.responseText;
        data = JSON.parse(response)
        console.dir(data)

        if (data.items.length == 0) {
          dispatch({
            type: GET_PHOTOS_EMPTY,
            payload: currentPhotos
          })

        } else {
          data.items.forEach((item) => {
            currentPhotos.push(item)
          })

          let currentUser = data.items[0].user.full_name
          let moreAvialableProp = data.more_available

          dispatch({
            type: GET_PHOTOS_SUCCESS,
            payload: currentPhotos,
            user: currentUser,
            moreAvialable: moreAvialableProp
          })

        }
      } else {
        dispatch({
          type: GET_PHOTOS_FAIL,
          payload: new Error(e)
        })
      }
      document.querySelector('.target').children[1].focus()
    }
    xhr.send();
  }

}

export function getPhotos(nickname, year, photosLoaded) {

  if (photosLoaded) return changeFilteredPreview(nickname, year)
  if (year) return loadFilteredPreview(nickname, year)
  if (typeof nickname == 'string') return loadPreview(nickname)
  return getMore()

}
