#!/usr/bin/env node
const app = require('../')
// TODO: use env
const port = 3333
const listenCallback = () => {
  console.log(`The app is now listening on port ${port}.`)
}
app.listen(port, listenCallback)
