module.exports = (sequelize) => {
  const Url = require('./Url')(sequelize)
  const models = [
    Url,
  ]

  const saveNewUrl = async (urlObject) => {
    return await Url.create(urlObject)
      .then((url) => {
        const plain = url.get({ plain: true })
        return plain
      })
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
    saveNewUrl,
    tests_only_setup,
    tests_only_truncate,
  }
}
