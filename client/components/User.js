import React, { PropTypes, Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class User extends Component {
  componentDidMount() {
    /* eslint-disable */
    
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1869889646564013',
        xfbml      : false,
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
    const { name, login, error, handleLogin } = this.props
    let btn_text;

    if (login) {
      btn_text = 'Log out'
    } else {
      btn_text = 'Log in FB'
    }

    return (
      <div className='ib user'>
        {
          error ?
          <p className='error'>{error}. Try again.</p> : ''
        }
        <p>Hello, {name}!</p>
        <RaisedButton className='btn' label={btn_text} onClick={handleLogin}/>
      </div>
    )
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}
