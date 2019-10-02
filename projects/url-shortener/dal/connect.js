const Sequelize = require('sequelize')

let connection

module.exports = (config) => {
  const {
    db,
    password,
    user,
  } = config

  if (!connection) {
    connection = new Sequelize(
      db,
      user,
      password,
      {
        host: 'localhost',
        dialect: 'postgres',
      }
    )
  } else {
    console.log('connection open')
  }

  return connection
}
