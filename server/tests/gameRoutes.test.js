import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';

describe('Game API Endpoints', () => {
  let gameId;
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URL);
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('POST should create a new game and return a unique gameId', async () => {
    const response = await request(app).post('/api/v1/game/new').send({});

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    gameId = response.body.gameId;
  });

  it('GET should return a game with the given gameId', async () => {
    const response = await request(app).get(`/api/v1/game/?gameId=${gameId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.gameId).toBe(gameId);
  });

  it('DELETE should delete a game with the given gameId', async () => {
    const response = await request(app).delete(
      `/api/v1/game/?gameId=${gameId}`,
    );

    expect(response.statusCode).toBe(200);
  });
});
