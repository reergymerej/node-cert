const fs = require('fs')
const http = require('http')

const handleNotFound = (res) => {
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
  const isNotFound = req.url !== '/hello.txt'
  if (isNotFound) {
    return handleNotFound(res)
  }

  // https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readfile_path_options_callback
  // Try reading async instead.
  const path = `public/${req.url}`
  const options = { encoding: 'utf8' }
  fs.readFile(path, options, (err, data) => {
    return res.end(data)
  })
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
