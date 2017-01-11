const request = require('request');
const express = require('express');
const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('./../webpack/common.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// Server configuration
app.disable('x-powered-by')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
})

// Production middleware
if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(__dirname + './../dist'));
}

const htmlTemplate = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Photo Filter</title>
        <link href="https://fonts.googleapis.com/css?family=Oleo+Script|Roboto" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        <script src="/static/client.js"></script>
      </body>
    </html>
  `;
}

app.get('/', (req, res) => {
  return res.send(htmlTemplate())
})

app.get('/request/:nickname?/:lastPhotoId?', (req, res) => {
  var nickname = req.params.nickname,
      lastPhotoId = req.params.lastPhotoId,
      url;

  if (nickname && lastPhotoId) {
    url = 'https://www.instagram.com/' + nickname + '/media/?max_id=' + lastPhotoId;

    return request.get(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return res.send(body)
      }
    })
  } else if (nickname) {
    url = 'https://www.instagram.com/' + nickname + '/media/';

    return request.get(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return res.send(body)
      }
    })
  }
  return res.send('error')
})

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Express server listening on port %s', port)
  }
})
