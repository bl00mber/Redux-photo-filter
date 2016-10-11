import React, { PropTypes, Component } from 'react'

export default class Page extends Component {
  onYearBtnClick(e) {
    this.props.getPhotos(+e.target.innerText)
  }
  render() {
    const { year, photos, fetching } = this.props
    return <div className='ib page'>
      <p className='feedback_text'>You can send email me to: <a href='mailto:bloomber111@gmail.com'>bloomber111@gmail.com</a></p>
      <p>
        <button className='btn' onClick={::this.onYearBtnClick}>2016</button>{' '}
        <button className='btn' onClick={::this.onYearBtnClick}>2015</button>{' '}
        <button className='btn' onClick={::this.onYearBtnClick}>2014</button>
      </p>
      {
        fetching ?
        <p className='status_text'>Loading...</p>
        :
        <p className='status_text'>You have {photos.length} images from {year} avialable.</p>
      }
    </div>
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired
}
