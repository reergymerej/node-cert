const toPlain = result => result.get({ plain: true })

module.exports = (sequelize) => {
  const Url = require('./models/Url')(sequelize)

  const saveNewUrl = async (urlObject) => {
    return await Url.create(urlObject)
      .then(toPlain)
  }

  const byId = async (id) => {
    return await Url.findByPk(id)
      .then(toPlain)
  }

  return {
    find: byId,
    models: [Url],
    save: saveNewUrl,
  }
}
