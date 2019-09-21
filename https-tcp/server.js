// start: node server.js
// see massaged headers: curl -H 'hello: dude' -H 'hello: dudette' http://localhost:3001/
// read body: curl -d "nice body" -X POST http://localhost:3001/
// throw and catch an error:

const http = require('http')

const logInfo = (req) => () => {
  const { method, url, headers, rawHeaders } = req
  console.log({ method, url, headers, rawHeaders })
}

const streaming = req => ['POST', 'PUT'].includes(req.method)

const server = http.createServer((req, res) => {
  const logger = logInfo(req)

  if (streaming(req)) {
    let chunks = []

    req.on('error', (err) => {
      console.log(err)
      res.end('I handled that error for you.')
    })

    req.on('data', (chunk) => {
      chunks = [...chunks, chunk]
    })

    req.on('end', () => {
      logger()
      const body = Buffer.concat(chunks).toString()
      if (body === 'boom!') {
        throw new Error(body)
      } else {
        res.end(body)
      }
    })

  } else {
    logger()
    res.end('gotcha')
  }
})

server.listen(3001)
