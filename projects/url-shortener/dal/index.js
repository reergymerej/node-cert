const connection = require('./connect')()
// all models are initialized
const models = require('./models')(connection)
// pass all models to DAL entities so they can use what they need
const urlApi = require('./url')(models)
const modelsList = Object.keys(models).map((model) => models[model])

// In order to set up the models, we need a connection.
// The DAL entity interface doesn't need this.  The models do.
// Create something that will share this across all the models so we don't have
// to do it like this.  That way, multiple entities can use the same model.

const tests_only_setup = async () => {
  const promises = modelsList.map((Model) => Model.sync({ force: true }))
  await Promise.all(promises)
}

const tests_only_truncate = async () => {
  const promises = modelsList.map((Model) => Model.truncate())
  await Promise.all(promises)
}

module.exports = {
  url: urlApi,
  tests_only_setup,
  tests_only_truncate,
}
