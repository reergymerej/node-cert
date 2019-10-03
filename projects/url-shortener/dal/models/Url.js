const Sequelize = require('sequelize')
const { Model } = Sequelize

const fields = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}

module.exports = (sequelize) => {
  class Url extends Model {}
  Url.init(fields, {
    sequelize,
    modelName: 'url',
  })

  return Url
}
