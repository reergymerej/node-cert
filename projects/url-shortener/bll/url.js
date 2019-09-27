const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

module.exports = (urlDAO) => {
  return {
    find: async (id) => {
      const result = urlDAO.byId(id)
      const hasError = result instanceof Error
      return hasError
        ? lookupError
        : result
    },

    saveNew: async (url) => {
      const urlObject = {
        id: await urlDAO.getNextId(),
        url,
      }
      const saveResult = await urlDAO.saveNewUrl(urlObject)
      const hasSaveError = saveResult instanceof Error
      return (hasSaveError)
        ? saveError
        : saveResult
    },
  }
}
