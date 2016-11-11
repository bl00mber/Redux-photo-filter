const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack/common.config')
const compiler = webpack(config)

const app = (require('express'))()
const request = require('request')

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

// Server configuration

app.disable('x-powered-by')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "origin, content-type, accept");
  next();
})

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
        <script src="client.js"></script>
      </body>
    </html>
  `;
}

app.get("/:nickname?/:lastPhotoId?", function(req, res) {
  var nickname = req.params.nickname,
      lastPhotoId = req.params.lastPhotoId;

  if (nickname && lastPhotoId) {
    var url = 'https://www.instagram.com/' + nickname + '/media/?max_id=' + lastPhotoId;

    return request.get(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        return res.send(body)
      }
    })
  } else if (nickname) {
    var url = 'https://www.instagram.com/' + nickname + '/media/';

    return request.get(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        return res.send(body)
      }
    })
  }
  return res.send(htmlTemplate())
})

const port = 3000

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
