const dal = require('./')
const connect = require('./connect')

// XXX: These are integration tests, not unit!
describe('DAL', () => {
  let api

  beforeAll(async () => {
    const config = {
      db: 'test',
      password: 'tester',
      user: 'tester',
    }
    const connection = connect(config)
    api = await dal(connection)
    await api.tests_only_setup()
  })

  afterAll(async () => {
    await api.tests_only_truncate()
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
      })
    })
  })
})
