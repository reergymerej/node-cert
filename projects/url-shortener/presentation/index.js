const http = require('http')

const goodUrlRegex = /api\/v1\/.*/
const isGoodUrl = (url) => goodUrlRegex.test(url)
const handleBad = (res) => {
  res.statusCode = 404
  res.end('nope')
}

module.exports = (bll) => {
  const serverOptions = {}
  const requestListener = async (req, res) => {
    if (!isGoodUrl(req.url)) {
      return handleBad(res)
    } else {
      const id = req.url.split('/').reverse()[0]
      await bll.url.find(id)
        .then((urlObject) => {
          res.end(JSON.stringify(urlObject))
        })
        .catch(error => {
          res.statusCode = 500
          res.end(error.toString())
        })
    }
  }
  const server = http.createServer(serverOptions, requestListener)
  return server
}
