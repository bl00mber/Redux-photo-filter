import {
  LOGOUT_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../constants/User'

export function handleLogin() {

  return function(dispatch) {
    /* eslint-disable */

    dispatch({
      type: LOGIN_REQUEST
    })

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {

        FB.logout(function(response) {

          dispatch({
           type: LOGOUT_SUCCESS,
           payload: 'Anonym',
           login: false
          })

        });

        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        
      } else {

        FB.login(function(response) {
          if (response.authResponse) {

            FB.api('/me', function(response) {
              let username = response.name

              dispatch({
               type: LOGIN_SUCCESS,
               payload: username,
               login: true
              })

            });

          } else {
            dispatch({
              type: LOGIN_FAIL,
              payload: new Error('Authorization failed'),
              error: true
            })
          }
        });

      }
    });

    /* eslint-enable */
  }

}
