const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

const getResultConverter = (encode) => (result) => ({
  id: encode(result.id),
  url: result.url,
})

module.exports = ({ urlDalApi, encode, decode }) => {
  const resultConverter = getResultConverter(encode)
  return {
    find: async (id) => {
      let result
      try {
        const int = decode(id)
        result = urlDalApi.find(int)
      } catch (error) {
        result = error
      }
      const hasError = result instanceof Error
      if (hasError) {
        throw lookupError
      }
      return resultConverter(result)
    },

    saveNew: async (url) => {
      let result
      try {
        const urlObject = {
          url,
        }
        // TODO: Check if the DAL actually throws or uses .catch or .reject.
        result = await urlDalApi.save(urlObject)
      } catch (error) {
        result = error
      }
      const hasSaveError = result instanceof Error
      if (hasSaveError) {
        throw saveError
      }
      return resultConverter(result)
    },
  }
}
