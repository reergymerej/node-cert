require('dotenv').config()

// Build the layers from storage up.
// create DAL
const dal = require('./dal')

// create BLL with injected DAL
const bll = require('./bll')(dal)

// create PL with injected BLL
const presentation = require('./presentation')(bll)

module.exports = presentation
