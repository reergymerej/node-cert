const getUrlBll = require('./url')
const { encode, decode } = require('./id')

describe('URL BLL', () => {
  describe('saving a url', () => {
    describe('if it fails', () => {
      it('should return an error', async () => {
        const error = new Error('low level DAL error')
        const urlDAO = {
          saveNewUrl: jest.fn(() => error),
        }
        const urlBll = getUrlBll({ urlDAO, encode })
        const result = await urlBll.saveNew()
        const saveError = new Error('Unable to save')
        expect(result).toEqual(saveError)
      })
    })

    describe('if it works', () => {
      it('should call the correct urlBll method with an object', async () => {
        const id = 10
        const url = 'http://foo.com'
        const urlObject = {
          url,
        }
        const urlDAO = {
          saveNewUrl: jest.fn((obj) => ({ ...obj, id })),
        }
        const urlBll = getUrlBll({ urlDAO, encode })
        await urlBll.saveNew(url)
        expect(urlDAO.saveNewUrl).toHaveBeenCalledWith(urlObject)
      })

      it('should return a url object', async () => {
        // arrange
        const id = 10
        const url = 'http://foo.com'
        const urlObject = {
          url,
        }
        const urlDAO = {
          saveNewUrl: jest.fn((obj) => ({ ...obj, id })),
        }
        const urlBll = getUrlBll({ urlDAO, encode })

        // act
        const result = await urlBll.saveNew(url)

        // assert
        // We convert the url into a nice object.
        // Test that it calls the mock with the object.
        expect(urlDAO.saveNewUrl).toHaveBeenCalledWith(urlObject)
        // Test that the result is the DAL response with the converted id.
        expect(result).toEqual({
          ...urlObject,
          id: encode(id),
        })
      })
    })
  })

  describe('looking up a url', () => {
    it('should convert the id to an int', async () => {
      // arrange
      const int = 1200
      const id = encode(int)
      const urlDAO = {
        byId: jest.fn(() => ({id: int})),
      }
      const urlBll = getUrlBll({ urlDAO, encode, decode })

      // act
      await urlBll.find(id)

      // assert
      expect(urlDAO.byId).toHaveBeenCalledWith(int)
    })

    describe('if it fails', () => {
      it('should return an error', async () => {
        // arrange
        const error = new Error('low level DAL error')
        const urlDAO = {
          byId: jest.fn(() => error),
        }
        const urlBll = getUrlBll({ urlDAO, encode, decode })

        // act
        const id = 'bongo'
        const result = await urlBll.find(id)

        // assert
        const lookupError = new Error('Unable to find')
        expect(result).toEqual(lookupError)
      })
    })

    describe('if it works', () => {
      it('should return a url object', async () => {
        // arrange
        const int = 1200
        const id = encode(int)
        const urlObject = {
          url: 'http://boop.com',
        }
        const urlDAO = {
          byId: jest.fn(() => ({
            ...urlObject,
            id: int,
          })),
        }
        const urlBll = getUrlBll({ urlDAO, encode, decode })

        // act
        const result = await urlBll.find(id)

        // assert
        // Test that it converted the id to an int.
        expect(urlDAO.byId).toHaveBeenCalledWith(int)
        // Test that the result was converted.
        expect(result).toEqual({
          ...urlObject,
          id,
        })
      })
    })
  })
})
