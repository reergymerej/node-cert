const getUrlBll = require('./url')
const { fromInt } = require('./id')

describe('URL BLL', () => {
  describe('saving a url', () => {
    describe('if it fails', () => {
      it('should return an error', async () => {
        // arrange
        const error = new Error('low level DAL error')
        const urlDAO = {
          saveNewUrl: jest.fn(() => error),
        }
        const urlBll = getUrlBll(urlDAO, fromInt)

        // act
        const url = 'http://foo.com'
        const result = await urlBll.saveNew(url)

        // assert
        const saveError = new Error('Unable to save')
        expect(result).toEqual(saveError)
      })
    })

    fdescribe('if it works', () => {
      it('should return a url object', async () => {
        // arrange
        const count = 10
        const url = 'http://foo.com'
        const urlObject = {
          url,
        }
        const urlDAO = {
          saveNewUrl: jest.fn((obj) => ({ ...obj, count })),
        }
        const urlBll = getUrlBll(urlDAO, fromInt)

        // act
        const result = await urlBll.saveNew(url)

        // assert
        // We convert the url into a nice object.
        expect(urlDAO.saveNewUrl).toHaveBeenCalledWith(urlObject)
        expect(result).toEqual({
          ...urlObject,
          id: fromInt(count),
        })
      })
    })
  })

  describe('looking up a url', () => {
    describe('if it fails', () => {
      it('should return an error', async () => {
        // arrange
        const error = new Error('low level DAL error')
        const urlDAO = {
          byId: jest.fn(() => error),
        }
        const urlBll = getUrlBll(urlDAO, fromInt)

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
        const id = 'bongo'
        const urlObject = {
          id,
          url: 'http://boop.com',
        }
        const urlDAO = {
          byId: jest.fn(() => urlObject),
        }
        const urlBll = getUrlBll(urlDAO, fromInt)

        // act
        const result = await urlBll.find(id)

        // assert
        expect(urlDAO.byId).toHaveBeenCalledWith(id)
        expect(result).toEqual(urlObject)
      })
    })
  })
})
