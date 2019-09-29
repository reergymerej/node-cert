const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

const getResultConverter = (fromInt) => (result) => ({
  id: fromInt(result.count),
  url: result.url,
})

module.exports = (urlDAO, fromInt) => {
  const saveResultConverter = getResultConverter(fromInt)
  return {
    find: async (id) => {
      const result = urlDAO.byId(id)
      const hasError = result instanceof Error
      return hasError
        ? lookupError
        : result
    },

    saveNew: async (url) => {
      let saveResult
      try {
        // TODO: Watch out for race conditions.
        // const count = await urlDAO.getCount()
        const urlObject = {
          url,
        }
        saveResult = await urlDAO.saveNewUrl(urlObject)
      } catch (error) {
        saveResult = error
      } finally {
        const hasSaveError = saveResult instanceof Error
        return hasSaveError
          ? saveError
          : saveResultConverter(saveResult)
      }
    },
  }
}
