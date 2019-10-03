const getUrlBll = require('./url')
const { encode, decode } = require('./id')

// This needs to match the return from dal/url.
const urlDalApi = {
  find: jest.fn(),
  save: jest.fn(),
}

describe('URL BLL', () => {
  describe('saving a url', () => {
    it('should call the correct urlDalApi method with an object', async () => {
      const id = 10
      const url = 'http://foo.com'
      const urlObject = {
        url,
      }
      urlDalApi.save.mockImplementationOnce((obj) => ({ ...obj, id }))
      const urlBll = getUrlBll({ urlDalApi, encode })
      await urlBll.saveNew(url)
      expect(urlDalApi.save).toHaveBeenCalledWith(urlObject)
    })

    describe('if it fails', () => {
      it('should return an error', async () => {
        const error = new Error('low level DAL error')
        urlDalApi.save.mockReturnValueOnce(error)
        const urlBll = getUrlBll({ urlDalApi, encode })
        const saveError = new Error('Unable to save')
        await expect(urlBll.saveNew()).rejects.toThrow(saveError)
      })
    })

    describe('if it works', () => {
      it('should return a url object with encoded id', async () => {
        const id = 10
        const url = 'http://foo.com'
        const urlObject = {
          url,
        }
        urlDalApi.save.mockImplementationOnce((obj) => ({ ...obj, id }))
        const urlBll = getUrlBll({ urlDalApi, encode })
        const result = await urlBll.saveNew(url)
        expect(result).toEqual({
          ...urlObject,
          id: encode(id),
        })
      })
    })
  })

  describe('looking up a url', () => {
    it('should convert the id to an int and call the DAL method', async () => {
      const int = 1200
      urlDalApi.find.mockReturnValueOnce({id: int})
      const urlBll = getUrlBll({ urlDalApi, encode, decode })
      const id = encode(int)
      await urlBll.find(id)
      expect(urlDalApi.find).toHaveBeenCalledWith(int)
    })

    describe('if it fails', () => {
      it('should return an error', async () => {
        const error = new Error('low level DAL error')
        urlDalApi.find.mockImplementationOnce(() => { throw error })
        const urlBll = getUrlBll({ urlDalApi, encode, decode })
        const id = 'bongo'
        const lookupError = new Error('Unable to find')
        await expect(urlBll.find(id)).rejects.toThrow(lookupError)
      })
    })

    describe('if it works', () => {
      it('should return a url object with encoded id', async () => {
        const int = 1200
        const id = encode(int)
        const urlObject = {
          url: 'http://boop.com',
        }
        urlDalApi.find.mockImplementationOnce(() => ({
          ...urlObject,
          id: int,
        }))
        const urlBll = getUrlBll({ urlDalApi, encode, decode })
        const result = await urlBll.find(id)
        expect(result).toEqual({
          ...urlObject,
          id,
        })
      })
    })
  })
})
