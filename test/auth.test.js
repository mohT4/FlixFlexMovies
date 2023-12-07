const request = require('supertest');
const app = require('../app');
const logger = require('../middlewares/logger/logger');

const setup = require('./setUp');

describe('auth controller', () => {
  setup();
  describe('signUp function', () => {
    it('should sign up a new user', async () => {
      const userData = {
        name: 'test user',
        email: 'test@gmail.com',
        password: 'password123456',
        passwordConfirmation: 'password123456',
      };

      const response = await request(app)
        .post('/api/v1/users/signup')
        .send(userData);
      expect(response.status).toBe(200);
    });
  });
});
