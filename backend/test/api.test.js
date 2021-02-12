const request = require('supertest');

const app = require('../src/app');
var task = "";

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Backend is currently Up'
      }, done);
  });
});

describe('GET /api/v1/tasks/random', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/tasks/random')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
