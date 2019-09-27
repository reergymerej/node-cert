/*
Business Logic Layer - speaks in generalizations
  getUrlForThisID
  saveUrl

  This doesn't have a lot of logic in this app, but the separation is still important.  Let's explain it in plain language.

  Hey, save this url.
  OK, do I care about auth?  No, not right now.
  Call the data access layer with the save command.
  If it saved, share the resulting id.
  If it failed, send an error.

 BLL creates the data objects.  DAL is responsible only for their storage.
*/

const saveError = new Error('Unable to save')
const lookupError = new Error('Unable to find')

module.exports = (urlDAO) => {
  return {
    saveUrl: async (url) => {
      const urlObject = {
        id: 'boop',
        url,
      }
      const saveResult = await urlDAO.saveNewUrl(urlObject)
      const hasSaveError = saveResult instanceof Error
      return (hasSaveError)
        ? saveError
        : saveResult
    },

    findUrlById: async (id) => {
      const result = urlDAO.byId(id)
      const hasError = result instanceof Error
      return hasError
        ? lookupError
        : result
    },
  }
}
