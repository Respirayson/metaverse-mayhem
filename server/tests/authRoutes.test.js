import request from 'supertest';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from '../index.js';

dotenv.config();

describe('Authentication API Endpoints', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URL);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('POST should return 400 for no signature and no publicAddress', async () => {
    const signature = '';
    const publicAddress = '';

    const response = await request(app)
      .post('/api/v1/auth/')
      .send({ signature, publicAddress })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.error).toBe(
      'Request should have signature and publicAddress',
    );
  });

  it('POST should return 401 for no publicAddress in database', async () => {
    // Send invalid signature and publicAddress
    const publicAddress = 'abcde';
    const response = await request(app)
      .post('/api/v1/auth/')
      .send({
        signature: 'invalid_signature',
        publicAddress,
      })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe(
      `User with publicAddress ${publicAddress} is not found in database`,
    );
  });
});
