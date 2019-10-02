const Sequelize = require('sequelize')

let connection

module.exports = (config, sequelizeOptions) => {
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
        ...sequelizeOptions,
      }
    )
  } else {
    console.log('connection open')
  }

  return connection
}
