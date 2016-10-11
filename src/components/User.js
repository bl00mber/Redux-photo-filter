import React, { PropTypes, Component } from 'react'

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
      <p>Hello, {name}!</p>
      <button className='btn' onClick={this.props.handleLogin}>{btn_text}</button>
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
