const app = require('./')
const fs = require('fs')
const request = require('supertest')

describe('when no file is specified', () => {
  it('should return a 404', async () => {
    await request(app)
      .get('/')
      .expect(404)
      .expect('')
  })
})

describe('when an invalid file is specified', () => {
  it('should return a 404', async () => {
    await request(app)
      .get('/bananas.boop')
      .expect(404)
      .expect('')
  })
})

describe('when a valid file is specified', () => {
  it('should return the file', async () => {
    await request(app)
      .get('/wink.txt')
      .expect(200)
      .expect(fs.readFileSync('public/wink.txt', 'utf8'))
  })
})
