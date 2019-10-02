const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

const getResultConverter = (encode) => (result) => ({
  id: encode(result.id),
  url: result.url,
})

module.exports = ({ urlDAO, encode, decode }) => {
  const resultConverter = getResultConverter(encode)
  return {
    find: async (id) => {
      const int = decode(id)
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
