import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', photosText: '' }
  }
  changeHandler = (e) => {
    let nickname = document.querySelector('.target').children[1].value,
        validRegex = /^[a-zA-Z0-9_]+$/,
        photosLoaded = this.props.photosCount,
        getPhotos = this.props.getPhotos;

    this.setState({ errorText: '', photosText: '' })

    if (nickname.match(validRegex)) {

      if (e.target.innerText == 'GET MORE') {
        if (photosLoaded)
        return getPhotos('GET_MORE_FILTERED', nickname, this.props.year);
        return getPhotos('GET_MORE', nickname);
      }

      // Handler for year buttons
      if (e.target.nodeName !== 'INPUT') {
        // Check the availability of the array to run filter
        if (photosLoaded)
        return getPhotos('CHANGE_FILTERED_PREVIEW', nickname, +e.target.innerText);
        // First loading and filtering
        return getPhotos('LOAD_FILTERED_PREVIEW', nickname, +e.target.innerText);
      }

      getPhotos('LOAD_PREVIEW', nickname)
      this.setState({ photosText: 'User has not photos' })
    } else {
      this.setState({ errorText: 'Enter nickname here', photosText: '' })
    }
  }
  render() {
    const { year, photos, fetching, empty, user, moreAvialable, photosCount } = this.props;
    const { errorText, photosText } = this.state;
    const years = [2016, 2015, 2014, 2013];

    return (
      <div className='ib page'>
        <div className='logo'></div>
        <div className='logo-text'>filter</div>
        {
          years.map((item, index) =>
          <RaisedButton label={item} key={index} disabled={errorText == 'Enter nickname here' || fetching}
           className='btn' onClick={this.changeHandler}/> )
        }
        {
          fetching ?
          <CircularProgress className='status_progressbar' size={30} thickness={3} />
          : ''
        }
        {
          errorText ? '' :
          fetching ?
          <p className='status_text'>Loading...</p>
          :
            (photos.length > 0) ?
              year ?
              <p className='status_text'>{user || 'User'} has {photosCount} items from {year} avialable (Filtered last 400 photos).</p>
              :
              <p className='status_text'>Photos by {user || document.querySelector('.target').children[1].value}</p>
            :
            empty ?
              <p className='status_text'>{photosText} { year ? ' from ' + year + ' (Filtered last 400 photos)' : '' }</p>
              :
              ''
        }
        <div className='advanced'>
          <TextField disabled={fetching} className='target' hintText='Enter Instagram nickname'
           errorText={errorText} onChange={this.changeHandler}/>
        </div>

        {
          errorText ? '' :
          <div className='content_container'>
            <div className='content'>
              {
                empty ?
                ''
                :
                photos.map((item, index) =>
                item.type == 'video' ?
                  <a href={item.link} target='_blank' key={index}>
                    <div className='content_items video'>
                      <div className='triangle_container'><div className='triangle'></div></div>
                      <img src={item.images.standard_resolution.url}></img>
                    </div>
                  </a>
                  :
                  <a href={item.link} target='_blank' key={index}>
                    <div className='content_items' key={index}>
                      <img src={item.images.standard_resolution.url}></img>
                    </div>
                  </a> )
                }
                {
                  moreAvialable ? <RaisedButton label='Get more' disabled={fetching}
                  className='btn get_more' onClick={this.changeHandler}>
                    { fetching ? <CircularProgress className='status_progressbar more' size={30} thickness={3} /> : '' }
                  </RaisedButton>
                 : ''
                }
              </div>
            </div>
          }
      </div>
    )
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  empty: PropTypes.bool.isRequired,
  moreAvialable: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  getPhotos: PropTypes.func.isRequired
}
