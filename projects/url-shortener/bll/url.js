const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

const getResultConverter = (encode) => (result) => ({
  id: encode(result.id),
  url: result.url,
})

module.exports = ({ urlDalApi, encode, decode }) => {
  const convertedResultOrNiceError = (niceError) => {
    const resultConverter = getResultConverter(encode)
    return async (fn) => {
      try {
        const result = await fn()
        return resultConverter(result)
      } catch (error) {
        throw niceError
      }
    }
  }

  return {
    find: async (id) => {
      return await convertedResultOrNiceError(lookupError)(async () => {
        const int = decode(id)
        return await urlDalApi.find(int)
      })
    },

    saveNew: async (url) => {
      return await convertedResultOrNiceError(saveError)(async () => {
        const urlObject = {
          url,
        }
        return await urlDalApi.save(urlObject)
      })
    },
  }
}
