const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

const getResultConverter = (encode) => (result) => ({
  id: encode(result.id),
  url: result.url,
})

const successHandlerOrError = (onSuccess) => (standardError) => async (fn) => {
  try {
    return onSuccess(await fn())
  } catch (error) {
    throw standardError
  }
}

module.exports = ({ urlDalApi, encode, decode }) => {
  const resultConverter = getResultConverter(encode)
  const convertOrError = successHandlerOrError(resultConverter)
  const find = convertOrError(lookupError)
  const save = convertOrError(saveError)

  return {
    find: async (id) => {
      return await find(() => {
        const int = decode(id)
        return urlDalApi.find(int)
      })
    },

    saveNew: async (url) => {
      return await save(() => {
        const urlObject = {
          url,
        }
        return urlDalApi.save(urlObject)
      })
    },
  }
}
