const toPlain = result => {
  return result && result.get({ plain: true })
}

module.exports = (sequelize) => {
  const Url = require('./models/Url')(sequelize)

  const save = async (urlObject) => {
    return await Url.create(urlObject)
      .then(toPlain)
  }

  const find = async (id) => {
    return await Url.findByPk(id)
      .then(toPlain)
  }

  return {
    find,
    models: [Url],
    save,
  }
}
