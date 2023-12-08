const request = require('supertest');
const app = require('../app');

const setup = require('./setUp');
const User = require('../models/user');

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

  describe('logIn function', () => {});
  it('should login a user', async () => {
    const testUser = {
      name: 'test user',
      email: 'test@gmail.com',
      password: 'password123456',
      passwordConfirmation: 'password123456',
    };
    await User.create(testUser);
    const user = {
      email: 'test@gmail.com',
      password: 'password123456',
    };
    await request(app).post('/api/v1/users/login').send(user).expect(200);
  });
});
