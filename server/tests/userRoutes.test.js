import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';

describe('User API Endpoints', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URL);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('POST should create a new user', async () => {
    const newUser = {
      publicAddress: '0x1234567890123456789012345678901234567890',
      username: 'Alice',
    };

    const response = await request(app).post('/api/v1/users/').send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.publicAddress).toBe(newUser.publicAddress);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.nonce).toBeTruthy();
  });

  it('GET should return a user', async () => {
    const newUser = {
      publicAddress: '0x1234567890123456789012345678901234567890',
      username: 'Alice',
    };

    const response = await request(app).get(
      `/api/v1/users/?publicAddress=${newUser.publicAddress}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.publicAddress).toBe(newUser.publicAddress);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.nonce).toBeTruthy();
  });
});
