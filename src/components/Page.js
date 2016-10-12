import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '' }
  }
  changeHandler(e) {
    let currentYear = 2016,
        URLInput = document.querySelector('.target').children[1],
        nickname = URLInput.value,
        validRegex = /^[a-zA-Z0-9]+$/,
        self = this,
        response = {}

    if (e.target.nodeName !== 'INPUT') currentYear = +e.target.innerText

    if (nickname.match(validRegex)) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET','https://www.instagram.com/' + nickname + '/media/');
      xhr.onreadystatechange = function() {
          if(xhr.readyState != 4) return;

          if (xhr.status == 200) {
            self.setState({ errorText: '' })
            response = xhr.responseText;
            console.dir(response);
          } else {
            self.setState({ errorText: 'Page not found' })
          }
      }
      xhr.send();

    } else {
      this.setState({ errorText: 'Enter nickname here' })
    }

    console.log(currentYear)
    console.log(nickname)

    this.props.getPhotos(currentYear, nickname, response)
  }
  render() {
    const { year, photos, fetching } = this.props
    const years = [2016,2015,2014,2013,2012]

    return <div className='ib page'>
      <div className='logo'></div>
      {
        years.map((item, index) =>
        <RaisedButton label={item} key={index}
         className='btn' onClick={::this.changeHandler}/> )
      }
      {
        fetching ?
        <p className='status_text'>Loading...</p>
        :
        <p className='status_text'>You have {photos.length} images from {year} avialable.</p>
      }
      <div className='advanced'>
        <TextField className='target' hintText='Target Instagram URL'
         errorText={this.state.errorText} onChange={::this.changeHandler}/>
      </div>
    </div>
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired
}
