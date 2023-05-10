/* eslint-disable import/first */
require('dotenv').config({
  path: '.env.test'
});

import { DB_ENV } from '@utils/testUtils/mockData';

process.env.ENVIRONMENT_NAME = 'test';
beforeEach(() => {
  process.env = { ...process.env, ...DB_ENV, ENVIRONMENT_NAME: 'test' };
});
afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.resetModules();
});
