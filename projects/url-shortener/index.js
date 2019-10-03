require('dotenv').config()

// Build the layers from storage up.
// establish db connection
const { DB: db, DB_PASSWORD: password, DB_USER: user } = process.env
const config = {
  db,
  password,
  user,
}
const sequelizeOptions = {
  logging: true,
}
const connection = require('./dal/connect')(config, sequelizeOptions)

// create DAL with injected connection
const dal = require('./dal')(connection)

// create BLL with injected DAL
const bll = require('./bll')(dal)

// create PL with injected BLL
const presentation = require('./presentation')(bll)

module.exports = presentation
