import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_EMPTY,
  GET_PHOTOS_FAIL
} from '../constants/Page'

/* eslint-disable */

let allPhotos = []
let currentPhotos = []

function makeYearPhotos(photos, selectedYear) {
  let createdYear, yearPhotos = []

  photos.forEach((item) => {
    createdYear = new Date(item.created*1000).getFullYear()
    if (createdYear === selectedYear ) {
      yearPhotos.push(item)
    }
  })
  yearPhotos.sort((a,b) => b.likes.count-a.likes.count);

  return yearPhotos
}

function getAllPhotos(year, data, nickname, dispatch) {

  data.items.forEach((item) => {
    allPhotos.push(item)
  })

  console.log(allPhotos)
  console.log('addtoarray')

  function getMore() {
    let lastPhotoId = data.items[data.items.length - 1].id

    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://www.instagram.com/' + nickname + '/media/?max_id=' + lastPhotoId);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status == 200) {
          data = JSON.parse(xhr.responseText)
          console.dir(data)

          data.items.forEach((item) => {
            allPhotos.push(item)
          })

          let lastItemTime = allPhotos[allPhotos.length - 1].created_time

          function yearChecker(UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000)
            var lastItemYear = a.getFullYear()

            console.log(year + ' input')
            console.log(lastItemYear + ' unix')

            if (data.more_available === true && allPhotos.length < 900) getMore()
          }

          yearChecker(lastItemTime)

          console.log(allPhotos)
          console.log('addtoarray')
        }
    }
    xhr.send();
  }

  getMore()

  dispatch({
    type: GET_PHOTOS_SUCCESS,
    payload: currentPhotos
  })

}

export function getPreviewPhotos(data, nickname) {

  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: 0
    })

    currentPhotos = []

    try {
      data = JSON.parse(data)
      console.dir(data)

      if (data.items.length == 0) {
        dispatch({
          type: GET_PHOTOS_EMPTY,
          payload: currentPhotos,
          user: '',
          empty: true
        })

      } else {
        data.items.forEach((item) => {
          currentPhotos.push(item)
        })

        let currentUser = data.items[0].user.full_name

        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: currentPhotos,
          user: currentUser,
          empty: false
        })
      }
    }
    catch(e) {
      dispatch({
        type: GET_PHOTOS_FAIL,
        payload: new Error(e),
        error: true
      })
    }

  }
}

/* eslint-enable */
