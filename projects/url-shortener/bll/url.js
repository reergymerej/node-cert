const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

const getResultConverter = (fromInt) => (result) => ({
  id: fromInt(result.id),
  url: result.url,
})

module.exports = ({ urlDAO, fromInt, toInt }) => {
  const resultConverter = getResultConverter(fromInt)
  return {
    find: async (id) => {
      const int = toInt(id)
      const result = urlDAO.byId(int)
      const hasError = result instanceof Error
      return hasError
        ? lookupError
        : resultConverter(result)
    },

    saveNew: async (url) => {
      let result
      try {
        const urlObject = {
          url,
        }
        result = await urlDAO.saveNewUrl(urlObject)
      } catch (error) {
        result = error
      } finally {
        const hasSaveError = result instanceof Error
        return hasSaveError
          ? saveError
          : resultConverter(result)
      }
    },
  }
}
