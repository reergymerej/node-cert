const dal = require('./')

// These are integration tests, not unit!
describe('DAL', () => {
  describe('saving and retrieving a new url', () => {
    describe('if it works', () => {
      it('should return the new object', async () => {
        const urlObject = {
          url: 'asdf',
        }
        const saveResult = await dal.url.save(urlObject)
        expect(saveResult.url).toBe('asdf')
        expect(saveResult.id).toEqual(expect.any(Number))
        const findResult = await dal.url.find(saveResult.id)
        expect(findResult).toEqual(saveResult)
      })
    })
  })

  describe('trying to find a missing url', () => {
    it('should return null', async () => {
      const id = 999888
      const findResult = await dal.url.find(id)
      expect(findResult).toEqual(null)
    })
  })
})
