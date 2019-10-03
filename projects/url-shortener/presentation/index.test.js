const request = require('supertest')
const bll = {
  url: {
    find: jest.fn(() => Promise.resolve()),
  },
}
const app = require('./')(bll)

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
      const id = 'asdf'
      await request(app)
        .get(`/api/v1/url/${id}`)
        .then(() => {
          expect(bll.url.find).toHaveBeenCalledWith(id)
        })
    })

    it('should return the URL obj as JSON', async () => {
      const id = 'asdf'
      const url = {url: 'http://boing.com', id}
      bll.url.find.mockReturnValueOnce(Promise.resolve(url))
      await request(app)
        .get(`/api/v1/url/${id}`)
        .expect(200)
        .expect(JSON.stringify(url))
    })
  })
})
