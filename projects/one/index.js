const fs = require('fs')
const http = require('http')

const handleNotFound = (res) => {
  res.setHeader('wtf', 'try again')
  res.statusCode = 404
  res.end('')
}

const options = {}
// The requestListener is a function which is automatically added to the
// 'request' event.
const requestListener = (req, res) => {
  // https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_clientrequest
  // https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_incomingmessage
  // <http.IncomingMessage>
  // https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_serverresponse
  // <http.ServerResponse>

  // Let's try a stream instead.
  // https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_createreadstream_path_options
  const path = `public${req.url}`
  const options = {}
  fs.createReadStream(path, options)
    .on('error', (err) => handleNotFound(res))
    .pipe(res)
}
const server = http.createServer(options, requestListener)

// If we were required by another script, start listening.
if (!module.parent) {
  const port = 3333
  const listenCallback = () => {
    console.log(`The server is now listening on port ${port}.`)
  }
  server.listen(port, listenCallback)
}

module.exports = server
