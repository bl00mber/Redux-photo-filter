import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '' }
  }
  changeHandler() {
    let URLInput = document.querySelector('.target').children[1],
        nickname = URLInput.value,
        validRegex = /^[a-zA-Z0-9_]+$/,
        self = this,
        response = {}

    // if (e.target.nodeName !== 'INPUT') year = +e.target.innerText

    if (nickname.match(validRegex)) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET','https://www.instagram.com/' + nickname + '/media/');
      xhr.onreadystatechange = function() {
          if(xhr.readyState != 4) return;

          if (xhr.status == 200) {
            self.setState({ errorText: '' })
            response = xhr.responseText;

            self.props.getPreviewPhotos(response, nickname)
          } else {
            self.setState({ errorText: 'Page not found' })
          }
      }
      xhr.send();

    } else {
      this.setState({ errorText: 'Enter nickname here' })
    }
  }
  render() {
    const { year, photos, fetching, empty, user } = this.props
    const years = [2016,2015,2014,2013]
    console.dir('photoss')
    console.dir(photos)
    console.dir('photoss')

    return <div className='ib page'>
      <div className='logo'></div>
      {
        years.map((item, index) =>
        <RaisedButton label={item} key={index} disabled={true}
         className='btn' onClick={::this.changeHandler}/> )
      }
      {
        fetching ?
        <p className='status_text'>Loading...</p>
        :
          (photos.length > 0) ?
            year ?
            <p className='status_text'>{user} has {photos.length} images from {year} avialable.</p>
            :
            <p className='status_text'>Photos by {user}</p>
          :
          <p className='status_text'>User has not photos</p>
      }
      <div className='advanced'>
        <TextField className='target' hintText='Enter Instagram nickname'
         errorText={this.state.errorText} onChange={::this.changeHandler}/>
      </div>
      <div className='content_container'>
        <div className='content'>
          {
            empty ?
            ''
            :
            photos.map((item, index) =>
            item.type == 'video' ?
              <div className='content_items video' key={index}>
               <img src={item.images.standard_resolution.url}></img>
              </div>
              :
              <div className='content_items' key={index}>
               <img src={item.images.standard_resolution.url}></img>
              </div> )
          }
        </div>
      </div>
    </div>
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  empty: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  getPreviewPhotos: PropTypes.func.isRequired
}
