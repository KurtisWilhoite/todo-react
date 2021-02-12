const request = require('supertest');

const app = require('../src/app');

describe('GET /', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
