import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'
import * as userActions from '../actions/UserActions'

class App extends Component {
  componentDidMount() {
    /* eslint-disable */

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1869889646564013',
        xfbml      : true,
        version    : 'v2.8'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

    /* eslint-enable */
  }

  render() {
    const { user, page } = this.props
    const { getPreviewPhotos } = this.props.pageActions
    const { handleLogin } = this.props.userActions

    return <div className='settings'>
      <Page photos={page.photos} year={page.year} fetching={page.fetching} empty={page.empty} user={page.user} getPreviewPhotos={getPreviewPhotos}/>
      <User name={user.name} login={user.login} error={user.error} handleLogin={handleLogin}/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
