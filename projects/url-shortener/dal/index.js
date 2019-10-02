module.exports = (sequelize) => {
  const Url = require('./Url')(sequelize)
  const models = [
    Url,
  ]

  const toPlain = result => result.get({ plain: true })

  const saveNewUrl = async (urlObject) => {
    return await Url.create(urlObject)
      .then(toPlain)
  }

  const byId = async (id) => {
    return await Url.findByPk(id)
      .then(toPlain)
  }

  const tests_only_setup = async () => {
    const promises = models.map((Model) => Model.sync({ force: true }))
    await Promise.all(promises)
  }

  const tests_only_truncate = async () => {
    const promises = models.map((Model) => Model.truncate())
    await Promise.all(promises)
  }

  return {
    byId,
    saveNewUrl,
    tests_only_setup,
    tests_only_truncate,
  }
}
