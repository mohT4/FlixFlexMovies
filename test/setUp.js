const mongoose = require('mongoose');
const logger = require('../middlewares/logger/logger');

const setup = () => {
  beforeAll(() => {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );

    mongoose.connect(DB).then(() => logger.info('TEST DATABASE CONNECTED'));
  });

  afterEach(async () => {
    await mongoose.connection.collection('users').deleteMany({});
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    jest.restoreAllMocks();
  });
};

module.exports = setup;
