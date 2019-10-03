const Sequelize = require('sequelize')
const {
  DB: db,
  DB_PASSWORD: password,
  DB_USER: user,
  HOST: host,
} = process.env

let connection

module.exports = () => {
  if (!connection) {
    connection = new Sequelize(
      db,
      user,
      password,
      {
        host,
        dialect: 'postgres',
        logging: false,
      }
    )
  }

  return connection
}
