import React, { PropTypes, Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class User extends Component {
  
  render() {
    const { name, login, error } = this.props
    let btn_text

    if (login) {
      btn_text = 'Log out'
    } else {
      btn_text = 'Log in'
    }

    return <div className='ib user'>
      <p className='feedback_text'>Email: <a href='mailto:bloomber111@gmail.com'>bloomber111@gmail.com</a></p>
      <p>Hello, {name}!</p>
      <RaisedButton className='btn' label={btn_text} onClick={this.props.handleLogin}/>
      {error ? <p className='error'>{error}.<br/>Try again.</p> : ''}
    </div>
  }

}

User.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}
