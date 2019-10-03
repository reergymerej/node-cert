const toPlain = result => {
  return result && result.get({ plain: true })
}

// Intialized models are passed in
module.exports = (models) => {
  const { Url } = models

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
    save,
  }
}
