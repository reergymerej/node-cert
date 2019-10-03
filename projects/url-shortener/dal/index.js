const url = require('./url')
const connection = require('./connect')()

const urlApi = url(connection)

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

module.exports = {
  url: urlApi,
  tests_only_setup,
  tests_only_truncate,
}
