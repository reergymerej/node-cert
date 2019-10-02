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

  describe('saveNewUrl', () => {
    describe('if it works', () => {
      it('should return the new object', async () => {
        const urlObject = {
          url: 'asdf',
        }

        const result = await api.saveNewUrl(urlObject)
        expect(result.url).toBe('asdf')
        expect(result.id).toEqual(expect.any(Number))

        // TODO: retrieve it now to verify
      })
    })
  })
})
