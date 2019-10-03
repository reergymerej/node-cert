require('dotenv').config()
const dal = require('./dal')

module.exports = async () => {
  await dal.tests_only_setup()
}
