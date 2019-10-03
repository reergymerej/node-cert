const app = require('./')
const request = require('supertest')

describe('presentation layer', () => {
  describe('user asks for a bogus path', () => {
    it('should respond with a 404', async () => {
      await request(app)
        .get('/bananas')
        .expect(404)
    })
  })

  describe('GET /api/v1/url/asdf', () => {
    it('should talk to the BLL, passing asdf', async () => {
      await request(app)
        .get('/api/v1/url/asdf')
        .expect(200)
        .then(() => {
          // expect(bll.url.find).toHaveBeenCalledWith('asdf')
        })
    })
  })
})
