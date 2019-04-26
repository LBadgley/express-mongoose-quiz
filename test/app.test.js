require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
// const Color = require('../lib/models/Color');

describe('color routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can post a new beautiful color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({ name: 'lavender', hex: '#967bb6', red: 59, green: 48, blue: 71 })
      .then(res => {
        expect(res.body).toEqual({
          name: 'lavender',
          _id: expect.any(String),
          hex: '#967bb6',
          red: 59,
          green: 48,
          blue: 71,
          __v: 0
        });
      });
  });
  it('gets a list of colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({ name: 'lavender', hex: '#967bb6', red: 59, green: 48, blue: 71 })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(color => {
        expect(color.body).toHaveLength(1);
      });
  });
});
it.only('can get a color by id', () => {
  return request(app)
    .post('/api/v1/colors')
    .send({ name: 'burnt orange', hex: '#BA3B1B', red: 186, green: 59, blue: 27 })
    .then(res => request(app).get(`/api/v1/colors/${res.body._id}`))
    .then(res => {
      expect(res.body).toEqual({
        _id: expect.any(String),
        name: 'burnt orange',
        hex: '#BA3B1B',
        red: 186,
        green: 59,
        blue: 27
      });
    });
});

