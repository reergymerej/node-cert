const getUrlBll = require('./url')

describe('URL BLL', () => {
  describe('saving a url', () => {
    describe('if it fails', () => {
      it('should return an error', async () => {
        // arrange
        const error = new Error('low level DAL error')
        const urlDAO = {
          getNextId: () => {},
          saveNewUrl: jest.fn(() => error),
        }
        const urlBll = getUrlBll(urlDAO)

        // act
        const url = 'http://foo.com'
        const result = await urlBll.saveNew(url)

        // assert
        const saveError = new Error('Unable to save')
        expect(result).toEqual(saveError)
      })
    })

    describe('if it works', () => {
      it('should return a url object', async () => {
        // arrange
        const _id = 'asdfqwerasdfzxc1234v'
        const id = 'aa3'
        const url = 'http://foo.com'
        const urlObject = {
          id,
          url,
        }
        const urlDAO = {
          getNextId: jest.fn(async () => await id),
          saveNewUrl: jest.fn(() => ({...urlObject, _id})),
        }
        const urlBll = getUrlBll(urlDAO)

        // act
        const result = await urlBll.saveNew(url)

        // assert
        expect(urlDAO.getNextId).toHaveBeenCalled()
        expect(urlDAO.saveNewUrl).toHaveBeenCalledWith(urlObject)
        expect(result).toEqual({
          _id,
          ...urlObject,
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
        const urlBll = getUrlBll(urlDAO)

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
        const urlBll = getUrlBll(urlDAO)

        // act
        const result = await urlBll.find(id)

        // assert
        expect(urlDAO.byId).toHaveBeenCalledWith(id)
        expect(result).toEqual(urlObject)
      })
    })
  })
})
