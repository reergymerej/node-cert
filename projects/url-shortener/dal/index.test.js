const dal = require('./')
const connect = require('./connect')

// These are integration tests, not unit!
describe('DAL', () => {
  let api

  beforeAll(async () => {
    require('dotenv').config()
    const { DB: db, DB_PASSWORD: password, DB_USER: user } = process.env
    const config = {
      db,
      password,
      user,
    }
    const sequelizeOptions = {
      logging: false,
    }
    const connection = connect(config, sequelizeOptions)
    api = await dal(connection)
    await api.tests_only_setup()
  })

  describe('saving and retrieving a new url', () => {
    describe('if it works', () => {
      it('should return the new object', async () => {
        const urlObject = {
          url: 'asdf',
        }

        const saveResult = await api.saveNewUrl(urlObject)
        expect(saveResult.url).toBe('asdf')
        expect(saveResult.id).toEqual(expect.any(Number))
        const findResult = await api.byId(saveResult.id)
        expect(findResult).toEqual(saveResult)
      })
    })
  })
})
