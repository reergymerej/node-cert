const url = require('./url')

module.exports = (sequelize) => {
  const urlApi = url(sequelize)

  const models = [
    ...urlApi.models,
  ]

  const tests_only_setup = async () => {
    const promises = models.map((Model) => Model.sync({ force: true }))
    await Promise.all(promises)
  }

  const tests_only_truncate = async () => {
    const promises = models.map((Model) => Model.truncate())
    await Promise.all(promises)
  }

  return {
    url: urlApi,
    tests_only_setup,
    tests_only_truncate,
  }
}
