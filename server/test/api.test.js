const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with an inserted message', (done) => {
    const requestObject = {
      name: 'Andrew',
      message: 'Cool woweee',
      latitude: -90,
      longitude: 180,
    };
    const responseObject = {
      ...requestObject,
      _id: '5c901569ea35d6464fa0456b',
      date: '2019-03-18T22:09:35.443Z'

    };
    request(app)
      .post('/api/v1/messages')
      .send(requestObject)
      .expect('Content-Type', /json/)
      .expect((res) => {
        console.log(res.body);
        res.body._id = '5c901569ea35d6464fa0456b';
        res.body.date = '2019-03-18T22:09:35.443Z';
      })
      .expect(200, responseObject, done);
  });
});
